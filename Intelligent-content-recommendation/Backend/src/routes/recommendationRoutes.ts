import express from "express";
import RecommendationController from "../controllers/recommendationController";
import { authenticateUser } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

/**
 * @route GET /recommendations
 * @desc Fetch personalized recommendations
 * @access Private (Requires Authentication)
 */
router.get("/", authenticateUser, validateRequest, RecommendationController.getRecommendations);

export default router;
