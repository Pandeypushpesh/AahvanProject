// ---------------------
// Core Imports
// ---------------------
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ---------------------
// Load Environment Variables
// ---------------------
dotenv.config({ path: "./.env" });

const app = express();

// ---------------------
// Security Middlewares
// ---------------------
app.use(helmet()); // Secure HTTP headers

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" })); // Prevent large payloads

// ---------------------
// Rate Limiting (to avoid abuse or DDoS)
// ---------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ---------------------
// Environment Validation
// ---------------------
const requiredEnv = ["MONGODB_URI", "PORT", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

// ---------------------
// MongoDB Connection
// ---------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ---------------------
// Import Routes
// ---------------------
import registrationRoutes from "./routes/registration.routes.js";

app.use("/api/registrations", registrationRoutes);

// ---------------------
// Default Route
// ---------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Ahvaan Telecom Backend is running successfully!",
  });
});

// ---------------------
// Server Initialization
// ---------------------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🌍 Server started on: http://localhost:${PORT}`);
});

// ---------------------
// Graceful Shutdown Handlers
// ---------------------
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

process.on("SIGINT", () => {
  console.log("🛑 Server shutting down gracefully...");
  server.close(() => process.exit(0));
});
