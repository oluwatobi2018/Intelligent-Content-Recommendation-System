import express from "express";
import authRoutes from "./authRoutes";
import contentRoutes from "./contentRoutes";
import recommendationRoutes from "./recommendationRoutes";
import userRoutes from "./userRoutes";
import analyticsRoutes from "./analyticsRoutes";
import { requestLogger } from "../middleware/requestLogger";
import { errorMiddleware } from "../middleware/errorMiddleware";

const router = express.Router();

// 🔹 Global Request Logging Middleware
router.use(requestLogger);

// 🔹 API Route Definitions
router.use("/auth", authRoutes);
router.use("/content", contentRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/users", userRoutes);
router.use("/analytics", analyticsRoutes);

// 🔹 Global Error Handling Middleware
router.use(errorMiddleware);

export default router;

