import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { ErrorResponse } from "../utils/errorHandler";

class AuthService {
  /**
   * Registers a new user
   */
  static async register(userData: { name: string; email: string; password: string }) {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorResponse("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return { id: user.id, name: user.name, email: user.email };
  }

  /**
   * Logs in an existing user and returns a JWT token
   */
  static async login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorResponse("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ErrorResponse("Invalid credentials", 401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: "7d" });
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}

export default AuthService;
