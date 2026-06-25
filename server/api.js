import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Booking from "./models/Booking.js";
import Order from "./models/Order.js";

const app = express();

console.log("🔥 SERVER RUNNING");

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connect
mongoose.connect(
  "mongodb://127.0.0.1:27017/restaurantDB"
)

.then(() =>
  console.log("MongoDB Connected ✅")
)

.catch((err) =>
  console.log("Mongo Error ❌", err)
);

// ✅ ROOT
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});



// ===================================================
// ✅ BOOKING API
// ===================================================

// SAVE BOOKING
app.post("/api/booking", async (req, res) => {

  try {

    console.log(
      "📩 Booking Data:",
      req.body
    );

    const booking = new Booking(
      req.body
    );

    await booking.save();

    res.json({
      success: true,
      message: "Booking Saved",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Booking Failed",
    });
  }
});

// GET BOOKINGS
app.get("/api/bookings", async (req, res) => {

  try {

    const data = await Booking.find()
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: "Failed to Fetch",
    });
  }
});



// ===================================================
// ✅ FOOD ORDER API
// ===================================================

// SAVE ORDER
app.post("/api/order", async (req, res) => {

  try {

    console.log(
      "🍽️ Order Data:",
      req.body
    );

    const order = new Order({
      customerName:
        req.body.customerName,

      tableNumber:
        req.body.tableNumber,

      items:
        req.body.items,

      totalPrice:
        req.body.totalPrice,
    });

    await order.save();

    res.json({
      success: true,
      message: "Order Placed Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order Failed",
    });
  }
});

// GET ORDERS
app.get("/api/orders", async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      error: "Failed to Fetch Orders",
    });
  }
});



// ===================================================
// ✅ SERVER START
// ===================================================

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});