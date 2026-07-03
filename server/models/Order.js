import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  customerName: String,

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
