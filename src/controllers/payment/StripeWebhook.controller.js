import { stripe } from "../utils/stripe.js";
import { Payment } from "../models/payment.model.js";
import { Order } from "../models/order.model.js";

/*
====================================================
3️⃣ STRIPE WEBHOOK HANDLER
====================================================
Stripe sends event after payment success/failure.
We verify signature.
Then update Payment + Order.
*/

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle event types
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const payment = await Payment.findOne({
      paymentIntentId: paymentIntent.id
    });

    if (payment) {
      payment.status = "succeeded";
      payment.receiptUrl = paymentIntent.charges.data[0]?.receipt_url;
      await payment.save();

      await Order.findByIdAndUpdate(payment.order, {
        paymentStatus: "paid",
        orderStatus: "processing"
      });
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;

    await Payment.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      { status: "failed" }
    );
  }

  res.status(200).json({ received: true });
};
