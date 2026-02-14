// import { Router } from "express";
// import {
//   createPaymentIntent,
//   confirmPayment
// } from "../controllers/payment.controller.js";
// import { stripeWebhook } from "../controllers/webhook.controller.js";
// import authenticate from "../middlewares/auth.middleware.js";

// const router = Router();

// router.post("/create-intent", authenticate, createPaymentIntent);
// router.post("/confirm", authenticate, confirmPayment);

// // IMPORTANT: webhook must use raw body
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );

// export default router;
// IMPORTANT EXPRESS CONFIG

// In app.js:

// app.use("/api/payments/webhook", express.raw({ type: "application/json" }));


// Webhook route must come BEFORE express.json() middleware.