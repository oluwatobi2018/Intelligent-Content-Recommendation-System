import { Request, Response } from "express";
import RecommendationService from "../services/recommendationService";
import logger from "../utils/logger";

const RecommendationController = {
  /**
   * Get personalized recommendations for a user
   */
  async getRecommendations(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id; // Assuming JWT middleware sets req.user
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized access." });
      }

      const { page = "1", limit = "10" } = req.query;
      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);

      const recommendations = await RecommendationService.generateRecommendations(userId, pageNum, limitNum);

      logger.info(`Generated ${recommendations.length} recommendations for user: ${userId}`);
      return res.status(200).json({ success: true, recommendations });
    } catch (error) {
      logger.error(`Error fetching recommendations: ${error.message}`);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch recommendations.",
        error: error.message,
      });
    }
  },
};

export default RecommendationController;
