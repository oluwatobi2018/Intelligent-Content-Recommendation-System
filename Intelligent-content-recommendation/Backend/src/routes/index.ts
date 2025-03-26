import express from "express";
import authRoutes from "./authRoutes";
import contentRoutes from "./contentRoutes";
import recommendationRoutes from "./recommendationRoutes";
import userRoutes from "./userRoutes";
import analyticsRoutes from "./analyticsRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/content", contentRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/users", userRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
