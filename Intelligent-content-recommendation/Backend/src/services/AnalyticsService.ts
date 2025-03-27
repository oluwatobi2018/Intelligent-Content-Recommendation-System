import Analytics from "../models/Analytics";

class AnalyticsService {
  /**
   * Fetches analytics data
   */
  static async getAnalytics() {
    return await Analytics.find().populate("userId contentId");
  }

  /**
   * Logs user actions (view, like, share, click)
   */
  static async logAction(userId: string, contentId: string, action: string) {
    return await Analytics.create({ userId, contentId, action });
  }
}

export default AnalyticsService;
