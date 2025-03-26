import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes"; // Import your routes
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // Logs requests to the console
app.use(helmet()); // Security headers

// API Routes
app.use("/api", routes);

// 404 Not Found Middleware
app.use(notFound);

// Global Error Handler Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
