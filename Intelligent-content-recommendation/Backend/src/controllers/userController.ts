import { Request, Response } from "express";
import UserService from "../services/userService";
import logger from "../utils/logger";

const UserController = {
  /**
   * Fetch user profile based on authenticated user ID
   */
  async getUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized access." });
      }

      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }

      logger.info(`User profile fetched successfully for userId: ${userId}`);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      logger.error(`Error fetching user profile: ${error.message}`);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch user profile.",
        error: error.message,
      });
    }
  },
};

export default UserController;

