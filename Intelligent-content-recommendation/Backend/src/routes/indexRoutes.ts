import express from "express";
import rateLimit from "express-rate-limit";  // ✅ Import rate limiter
import authRoutes from "./authRoutes";
import contentRoutes from "./contentRoutes";
import recommendationRoutes from "./recommendationRoutes";
import userRoutes from "./userRoutes";
import analyticsRoutes from "./analyticsRoutes";
import { requestLogger } from "../middleware/requestLogger";
import { errorMiddleware } from "../middleware/errorMiddleware";

const router = express.Router();

// 🔹 Apply Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per window per IP
    message: { error: "Too many requests, please try again later." },
    headers: true,
});

// 🔹 Global Request Logging Middleware
router.use(requestLogger);

// 🔹 API Route Definitions with Rate Limiting
router.use("/auth", apiLimiter, authRoutes);
router.use("/content", apiLimiter, contentRoutes);
router.use("/recommendations", apiLimiter, recommendationRoutes);
router.use("/users", apiLimiter, userRoutes);
router.use("/analytics", analyticsRoutes); // Analytics may not need rate limiting

// 🔹 Global Error Handling Middleware
router.use(errorMiddleware);

export default router;
export { router as apiRouter };
