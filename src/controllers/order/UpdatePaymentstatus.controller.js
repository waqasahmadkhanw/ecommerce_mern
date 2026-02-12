import { Order } from "../../models/order.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

/*
🟢 UPDATE PAYMENT STATUS
========================
Steps:
• Get order
• Update paymentStatus
• Save
*/
export const updatePaymentStatus = asnycHandler(async (req, res) => {
  const { paymentStatus } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");

  order.paymentStatus = paymentStatus || order.paymentStatus;
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Payment status updated"));
});
