import express from "express";
import AnalyticsController from "../controllers/analyticsController";
import { authenticateUser } from "../middleware/authMiddleware";
import { requestLogger } from "../middleware/requestLogger";

const router = express.Router();

/**
 * @route GET /analytics
 * @desc Fetch user analytics (Protected Route)
 * @access Private (Requires Authentication)
 */
router.get("/", authenticateUser, requestLogger, AnalyticsController.getAnalytics);

export default router;
