import { Order } from "../../models/order.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

/*
🟢 UPDATE ORDER STATUS (Admin)
=============================
Steps:
• Get order
• Update status
• Save
*/
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");

  order.orderStatus = orderStatus || order.orderStatus;
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated"));
});
