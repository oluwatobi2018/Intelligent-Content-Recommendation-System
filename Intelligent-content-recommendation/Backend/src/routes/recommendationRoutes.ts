import express from "express";
import RecommendationController from "../controllers/recommendationController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticate, RecommendationController.getRecommendations);

export default router;
