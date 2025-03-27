import { Request, Response } from "express";
import AnalyticsService from "../services/analyticsService";
import logger from "../utils/logger"; // Import logger for better error tracking

const AnalyticsController = {
  /**
   * Get analytics data with optional filters
   */
  async getAnalytics(req: Request, res: Response): Promise<Response> {
    try {
      // Extract optional query parameters (e.g., date range, category, etc.)
      const { startDate, endDate, category } = req.query;

      // Fetch analytics data with optional filters
      const data = await AnalyticsService.getAnalytics({ startDate, endDate, category });

      // Respond with analytics data
      return res.status(200).json({ success: true, data });
    } catch (error) {
      logger.error(`Analytics Fetch Error: ${error.message}`);

      // Send structured error response
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Unable to fetch analytics.",
        error: error.message,
      });
    }
  },
};

export default AnalyticsController;

