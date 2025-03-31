import express from "express";
import { register } from "prom-client";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import compression from "compression"; // 🚀 Improves performance
import rateLimit from "express-rate-limit"; // 🚀 Prevents abuse
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { requestLogger } from "./middlewares/requestLogger";
import contentRoutes from "./routes/contentRoutes";
import authRoutes from "./routes/authRoutes";
import metricsRouter from "./middleware/metrics";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// 🚀 Set up security & performance middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // Restrict CORS to client URL
app.use(helmet()); // Security headers
app.use(compression()); // 🚀 Compress responses for better performance
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies
app.use(morgan("dev")); // Log requests
app.use(requestLogger); // Custom request logger
app.use("/monitoring", metricsRouter); // Prometheus metrics endpoint

// 🚀 Rate Limiting (prevents DDoS & brute-force attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// 📌 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

// 📌 Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running!" });
});

// 📌 Global error handler
app.use(errorMiddleware);

export default app;

// 📌 Prometheus metrics endpoint
const app = express();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

export default app;
