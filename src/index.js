import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import dotenv from "dotenv";
// dotenv.config();


// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();

// ---------------------
// 🔒 Security Middlewares
// ---------------------
app.use(helmet()); // Sets HTTP security headers
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" })); // Prevent large payloads

// ---------------------
// 🚦 Rate Limiter (to prevent abuse / DDoS)
// ---------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ---------------------
// 🧠 Environment Validation
// ---------------------
const requiredEnv = ["MONGODB_URI", "PORT", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

// ---------------------
// 🧩 Database Connection
// ---------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// ---------------------
// 🌐 Sample Routes
// ---------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Ahvaan Telecom Backend is running successfully!",
  });
});

// Example: import your routes later
// import userRoutes from "./routes/user.routes.js";
// app.use("/api/users", userRoutes);

// ---------------------
// ⚙️ Server Initialization
// ---------------------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🌍 Server started on: http://localhost:${PORT}`);
});

// ---------------------
// 🧹 Graceful Shutdown
// ---------------------
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

process.on("SIGINT", () => {
  console.log("🛑 Server shutting down gracefully...");
  server.close(() => process.exit(0));
});
