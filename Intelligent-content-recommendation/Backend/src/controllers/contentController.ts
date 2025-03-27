import { Request, Response } from "express";
import ContentService from "../services/contentService";
import logger from "../utils/logger";
import { validationResult } from "express-validator";

const ContentController = {
  /**
   * Get all content with pagination support
   */
  async getAllContent(req: Request, res: Response): Promise<Response> {
    try {
      const { page = "1", limit = "10" } = req.query;
      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);

      const content = await ContentService.getAllContent(pageNum, limitNum);

      logger.info(`Fetched ${content.length} content items`);
      return res.status(200).json({ success: true, content });
    } catch (error) {
      logger.error(`Error fetching content: ${error.message}`);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch content.",
        error: error.message,
      });
    }
  },

  /**
   * Create new content
   */
  async createContent(req: Request, res: Response): Promise<Response> {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const newContent = await ContentService.createContent(req.body);

      logger.info(`New content created: ${newContent.title}`);
      return res.status(201).json({ success: true, content: newContent });
    } catch (error) {
      logger.error(`Error creating content: ${error.message}`);

      return res.status(400).json({
        success: false,
        message: "Failed to create content.",
        error: error.message,
      });
    }
  },

  /**
   * Delete content by ID
   */
  async deleteContent(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await ContentService.deleteContent(id);

      logger.info(`Content deleted: ${id}`);
      return res.status(200).json({ success: true, message: "Content deleted successfully." });
    } catch (error) {
      logger.error(`Error deleting content: ${error.message}`);

      return res.status(400).json({
        success: false,
        message: "Failed to delete content.",
        error: error.message,
      });
    }
  },
};

export default ContentController;
