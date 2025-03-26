import { Request, Response } from "express";
import AnalyticsService from "../services/analyticsService";

const AnalyticsController = {
  async getAnalytics(req: Request, res: Response) {
    try {
      const data = await AnalyticsService.getAnalytics();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default AnalyticsController;
