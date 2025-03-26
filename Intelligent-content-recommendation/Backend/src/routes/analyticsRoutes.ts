import express from "express";
import AnalyticsController from "../controllers/analyticsController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticate, AnalyticsController.getAnalytics);

export default router;
