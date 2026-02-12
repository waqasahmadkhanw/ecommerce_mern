import mongoose, { Schema } from "mongoose";

// 🧩 Mini schema for each ordered item
const orderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true // snapshot at order time
  }
});

// 📦 Main Order Schema
const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [orderItemSchema],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "CARD", "RAZORPAY", "STRIPE"],
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  orderStatus: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },

  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  }

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
