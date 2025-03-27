import User from "../models/User";
import { ErrorResponse } from "../utils/errorHandler";

class UserService {
  /**
   * Fetches user profile by ID
   */
  static async getUserById(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ErrorResponse("User not found", 404);
    }
    return user;
  }
}

export default UserService;
