import { Request, Response } from "express";
import ContentService from "../services/contentService";

const ContentController = {
  async getAllContent(req: Request, res: Response) {
    try {
      const content = await ContentService.getAllContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createContent(req: Request, res: Response) {
    try {
      const newContent = await ContentService.createContent(req.body);
      res.status(201).json(newContent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteContent(req: Request, res: Response) {
    try {
      await ContentService.deleteContent(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default ContentController;
