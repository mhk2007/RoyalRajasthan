import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Booking from "./models/Booking.js";
import Order from "./models/Order.js";
import User from "./models/User.js";
import connectDB from "./connect.js";
import { createAuthToken, verifyAuthToken } from "./authTokens.js";
import { hashPassword, verifyPassword } from "./passwords.js";
import { getBookingEmailContent, getOrderEmailContent, renderMail } from "../src/Components/Mail/mail.js";

dotenv.config();

console.log("SMTP_HOST loaded:", Boolean(process.env.SMTP_HOST));
console.log("MAIL_FROM loaded:", Boolean(process.env.MAIL_FROM));
console.log("MAIL_TO loaded:", Boolean(process.env.MAIL_TO));

const app = express();

const mailTransporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure:
        process.env.SMTP_SECURE === "true" ||
        Number(process.env.SMTP_PORT) === 465,
      ...(process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          }
        : {}),
    })
  : null;

async function sendEmail(to, subject, details, intro) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  if (!mailTransporter || !from || !to) {
    console.warn("Email not sent: configure SMTP_HOST, MAIL_FROM, and the recipient address in server/.env");
    return;
  }

  const { subject: cleanSubject, text, html } = renderMail(
    subject,
    details,
    intro,
  );

  try {
    await mailTransporter.sendMail({
      from,
      to,
      subject: cleanSubject,
      text,
      html,
    });
  } catch (error) {
    console.error("Email notification failed:", error.message);
  }
}

const sendAdminEmail = (subject, details, intro) =>
  sendEmail(process.env.MAIL_TO, subject, details, intro);

async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";
  const tokenPayload = verifyAuthToken(token);

  if (!tokenPayload) {
    return res.status(401).json({
      success: false,
      message: "Please sign in to view your history.",
    });
  }

  try {
    const user = await User.findById(tokenPayload.userId).select("name email");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Account not found. Please sign in again.",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not verify your session.",
    });
  }
}

connectDB()
  .then(() => {
    console.log("Database  Connected byy mhk");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("API Working Fine");
});

// Account API
app.post("/api/auth/signup", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!name || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Enter your name (up to 100 characters).",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address.",
      });
    }

    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 1024) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });

    return res.status(201).json({
      success: true,
      message: "Account created. Please sign in.",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    console.error("Signup error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not create your account. Please try again.",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter your email and password.",
      });
    }

    const user = await User.findOne({ email }).select("+passwordHash");
    const passwordIsValid = user
      ? await verifyPassword(password, user.passwordHash)
      : false;

    if (!user || !passwordIsValid) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    return res.json({
      success: true,
      message: "Signed in successfully.",
      token: createAuthToken(user.id),
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not sign in. Please try again.",
    });
  }
});

app.get("/api/auth/history", requireAuth, async (req, res) => {
  try {
    const [bookings, orders] = await Promise.all([
      Booking.find({ email: req.user.email })
        .select("name date time guests tableType amount tables createdAt")
        .sort({ createdAt: -1 })
        .lean(),
      Order.find({ email: req.user.email })
        .select("customerName tableNumber items totalPrice createdAt")
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    return res.json({ success: true, bookings, orders });
  } catch (error) {
    console.error("History fetch error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not load your history.",
    });
  }
});

app.delete("/api/auth/history/:entryType/:id", requireAuth, async (req, res) => {
  const { entryType, id } = req.params;
  const Model = entryType === "booking"
    ? Booking
    : entryType === "order"
      ? Order
      : null;

  if (!Model || !mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid history item.",
    });
  }

  try {
    const deletedEntry = await Model.findOneAndDelete({
      _id: id,
      email: req.user.email,
    });

    if (!deletedEntry) {
      return res.status(404).json({
        success: false,
        message: "History item not found.",
      });
    }

    return res.json({ success: true, message: "History item deleted." });
  } catch (error) {
    console.error("History delete error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not delete this history item.",
    });
  }
});

// =========================
// BOOKING API
// =========================
// Create Booking
app.post("/api/booking", async (req, res) => {
  try {
    const customerEmail = String(req.body.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address" });
    }

    const booking = new Booking({ ...req.body, email: customerEmail });
    await booking.save();

    const emailContent = getBookingEmailContent(booking);
    const adminEmail = emailContent.admin;
    const customerEmailContent = emailContent.customer;

    await sendAdminEmail(
      adminEmail.subject,
      adminEmail.details,
      adminEmail.intro,
    );

    if (booking.email !== String(process.env.MAIL_TO || "").trim().toLowerCase()) {
      await sendEmail(
        booking.email,
        customerEmailContent.subject,
        customerEmailContent.details,
        customerEmailContent.intro,
      );
    }
    res.status(201).json({
      success: true,
      message: "Booking Saved Successfully",
    });
  } catch (error) {
    console.log("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Booking Failed",
    });
  }
});

// Get Bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      error: "Failed to Fetch Bookings",
    });
  }
});
// =========================
// ORDER API
// =========================
// Create Order
app.post("/api/order", requireAuth, async (req, res) => {
  try {
    const customerEmail = req.user.email;
    const hasTableBooking = await Booking.exists({ email: customerEmail });

    if (!hasTableBooking) {
      return res.status(403).json({
        success: false,
        code: "TABLE_BOOKING_REQUIRED",
        message: "A royal meal begins with a reserved table. Please book your table first, then we’ll be delighted to prepare your food order.",
      });
    }

    const order = new Order({
      customerName: req.body.customerName,
      email: customerEmail,
      tableNumber: req.body.tableNumber,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
    });

    await order.save();

    const emailContent = getOrderEmailContent(order);
    const adminEmail = emailContent.admin;
    const customerEmailContent = emailContent.customer;

    await sendAdminEmail(
      adminEmail.subject,
      adminEmail.details,
      adminEmail.intro,
    );

    if (order.email !== String(process.env.MAIL_TO || "").trim().toLowerCase()) {
      await sendEmail(
        order.email,
        customerEmailContent.subject,
        customerEmailContent.details,
        customerEmailContent.intro,
      );
    }
    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log("Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Order Failed",
    });
  }
});
// Get Orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      error: "Failed to Fetch Orders",
    });
  }
});
