import mongoose, { Schema } from "mongoose";

/*
💳 Stripe Payment Schema (Production Ready)
==========================================
Purpose:
• Store Stripe transaction snapshot
• Link to Order & User
• Track status, method, and receipt
• Never store card details (PCI safe)
*/

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    paymentIntentId: {
      type: String,
      required: true,
      unique: true
    },

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "usd"
    },

    paymentMethod: {
      type: String,
      default: "card"
    },

    status: {
      type: String,
      enum: ["pending", "succeeded", "failed", "refunded"],
      default: "pending"
    },

    receiptUrl: {
      type: String
    },

    rawResponse: {
      type: Object // Full Stripe response snapshot
    }
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
