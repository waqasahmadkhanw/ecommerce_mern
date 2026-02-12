import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/*
🟢 CREATE ORDER (Checkout)
=========================
Steps:
• Get logged-in user
• Find user's cart
• Validate cart items
• Create order snapshot
• Clear cart
• Return order
*/
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { paymentMethod, shippingAddress } = req.body;

  if (!paymentMethod || !shippingAddress) {
    throw new ApiError(400, "Payment method & shipping address required");
  }

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  // 🔒 Create snapshot of items
  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price // snapshot
  }));

  const totalAmount = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    paymentMethod,
    shippingAddress
  });

  // 🧹 Clear cart after order
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});
