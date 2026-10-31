import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

  name: String,
  email: { type: String, required: true, trim: true, lowercase: true },
  mobile: String,
  date: String,
  time: String,
  guests: Number,
  tableType: String,
  amount: Number,
  tables: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;