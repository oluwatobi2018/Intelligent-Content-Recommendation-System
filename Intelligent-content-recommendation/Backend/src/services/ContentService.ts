import Content from "../models/Content";
import { ErrorResponse } from "../utils/errorHandler";

class ContentService {
  /**
   * Fetches all content
   */
  static async getAllContent() {
    return await Content.find().sort({ createdAt: -1 });
  }

  /**
   * Creates new content
   */
  static async createContent(contentData: { title: string; description: string; createdBy: string }) {
    const { title, description, createdBy } = contentData;
    if (!title || !description) {
      throw new ErrorResponse("Title and description are required", 400);
    }

    return await Content.create({ title, description, createdBy });
  }

  /**
   * Deletes content by ID
   */
  static async deleteContent(contentId: string) {
    const content = await Content.findById(contentId);
    if (!content) {
      throw new ErrorResponse("Content not found", 404);
    }

    await content.deleteOne();
  }
}

export default ContentService;
