import User from "../models/User";
import { ErrorResponse } from "../utils/errorHandler";

class UserService {
  /**
   * Fetches user profile by ID
   * @param userId - The ID of the user to retrieve
   * @returns The user object without the password field
   * @throws ErrorResponse if the user is not found
   */
  static async getUserById(userId: string) {
    try {
      const user = await User.findById(userId).select("-password").lean();
      if (!user) {
        throw new ErrorResponse("User not found", 404);
      }
      return user;
    } catch (error) {
      throw new ErrorResponse(error.message || "Error fetching user", 500);
    }
  }
}

export default UserService;
