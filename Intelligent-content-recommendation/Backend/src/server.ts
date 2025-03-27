import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import routes from "./routes"; // Import all routes
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Security & Performance Middleware
app.use(cors());
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Limit requests
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev")); // Request logging

// API Routes
app.use("/api", routes);

// 404 Not Found Middleware
app.use(notFound);

// Global Error Handler Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
