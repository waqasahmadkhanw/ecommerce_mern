import { Order } from "../../models/order.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

/*
🟢 GET SINGLE ORDER
===================
Steps:
• Get orderId
• Find order
• Validate
*/
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("items.product user");

  if (!order) throw new ApiError(404, "Order not found");

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched"));
});
