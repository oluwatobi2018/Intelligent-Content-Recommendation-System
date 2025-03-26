import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { requestLogger } from "./middlewares/requestLogger";
import contentRoutes from "./routes/contentRoutes";
import authRoutes from "./routes/authRoutes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());  // Enable CORS for cross-origin requests
app.use(helmet());  // Security headers
app.use(express.json());  // Parse JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cookieParser());  // Parse cookies
app.use(morgan("dev"));  // Log requests to console
app.use(requestLogger);  // Custom request logger

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running!" });
});

// Global error handler
app.use(errorMiddleware);

export default app;
