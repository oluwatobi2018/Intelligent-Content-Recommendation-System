import { Request, Response } from "express";
import RecommendationService from "../services/recommendationService";

const RecommendationController = {
  async getRecommendations(req: Request, res: Response) {
    try {
      const userId = req.user?.id; // Assuming JWT middleware sets req.user
      const recommendations = await RecommendationService.generateRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default RecommendationController;
