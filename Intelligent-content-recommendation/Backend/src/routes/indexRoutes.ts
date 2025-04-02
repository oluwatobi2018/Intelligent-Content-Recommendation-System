// 🔹 External Libraries
import express from "express";
import rateLimit from "express-rate-limit";

// 🔹 Internal Modules
import authRoutes from "./authRoutes";
import contentRoutes from "./contentRoutes";
import recommendationRoutes from "./recommendationRoutes";
import userRoutes from "./userRoutes";
import analyticsRoutes from "./analyticsRoutes";

// 🔹 Middleware
import { requestLogger } from "../middleware/requestLogger";
import { errorMiddleware } from "../middleware/errorMiddleware";

// 🔹 Initialize Router
const router = express.Router();

// 🔹 Rate Limiter Configuration
const createRateLimiter = (maxRequests: number, windowMinutes: number) =>
    rateLimit({
        windowMs: windowMinutes * 60 * 1000, // Convert minutes to milliseconds
        max: maxRequests,
        message: { error: "Too many requests, please try again later." },
        headers: true,
    });

const apiLimiter = createRateLimiter(100, 15); // 100 requests per 15 minutes

// 🔹 Global Middleware
router.use(requestLogger);

// 🔹 API Routes
const routes = [
    { path: "/auth", handler: authRoutes, applyRateLimiter: true },
    { path: "/content", handler: contentRoutes, applyRateLimiter: true },
    { path: "/recommendations", handler: recommendationRoutes, applyRateLimiter: true },
    { path: "/users", handler: userRoutes, applyRateLimiter: true },
    { path: "/analytics", handler: analyticsRoutes, applyRateLimiter: false }, // No rate limiter for analytics
];

// 🔹 Register Routes Dynamically
routes.forEach(({ path, handler, applyRateLimiter }) => {
    if (applyRateLimiter) {
        router.use(path, apiLimiter, handler);
    } else {
        router.use(path, handler);
    }
});

// 🔹 Global Error Handling Middleware
router.use(errorMiddleware);

export default router;
export { router as apiRouter };