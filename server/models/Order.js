import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  customerName: String,

  email: { type: String, required: true, trim: true, lowercase: true },

  tableNumber: String,

  items: Array,

  totalPrice: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;
