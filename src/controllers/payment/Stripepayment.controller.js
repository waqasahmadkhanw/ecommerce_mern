import { stripe } from "../utils/stripe.js";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/*
====================================================
1️⃣ CREATE PAYMENT INTENT
====================================================
Steps:
• Get orderId
• Validate order
• Create Stripe PaymentIntent
• Save payment record (pending)
• Send clientSecret to frontend
*/

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.body;

  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Create Stripe PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalPrice * 100, // Stripe uses cents
    currency: "usd",
    metadata: {
      orderId: order._id.toString(),
      userId: userId.toString()
    }
  });

  // Save payment snapshot
  const payment = await Payment.create({
    user: userId,
    order: order._id,
    paymentIntentId: paymentIntent.id,
    amount: order.totalPrice,
    currency: "usd",
    status: "pending",
    rawResponse: paymentIntent
  });

  return res.status(200).json(
    new ApiResponse(200, {
      clientSecret: paymentIntent.client_secret
    }, "Payment intent created")
  );
});
