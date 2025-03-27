import Recommendation from "../models/Recommendation";
import Content from "../models/Content";
import { ErrorResponse } from "../utils/errorHandler";

class RecommendationService {
  /**
   * Generates recommendations based on user preferences
   */
  static async generateRecommendations(userId: string) {
    const userPreferences = await Recommendation.findOne({ userId }).populate("recommendedContent");
    
    if (!userPreferences) {
      throw new ErrorResponse("No recommendations found", 404);
    }

    return userPreferences.recommendedContent;
  }
}

export default RecommendationService;
