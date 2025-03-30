const RecommendationService = require('../services/recommendationService');
const Logger = require('../utils/logger');

class RecommendationProcessor {
    constructor() {
        this.recommendationService = new RecommendationService();
        this.logger = new Logger();
    }

    async processRecommendations(userId) {
        try {
            this.logger.info(`Processing recommendations for user: ${userId}`);
            const recommendations = await this.recommendationService.generateRecommendations(userId);
            this.logger.info(`Recommendations generated successfully for user: ${userId}`);
            return recommendations;
        } catch (error) {
            this.logger.error(`Error processing recommendations for user: ${userId}`, error);
            throw error;
        }
    }
}

module.exports = RecommendationProcessor;