import { Request, Response } from "express";
import AuthService from "../services/authService";
import logger from "../utils/logger"; // Import logger for better error tracking
import { validationResult } from "express-validator"; // For request validation

const AuthController = {
  /**
   * User Registration
   */
  async register(req: Request, res: Response): Promise<Response> {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      // Register user
      const user = await AuthService.register(req.body);

      logger.info(`User registered: ${user.email}`);
      return res.status(201).json({ success: true, user });
    } catch (error) {
      logger.error(`Registration Error: ${error.message}`);

      return res.status(400).json({
        success: false,
        message: "Registration failed.",
        error: error.message,
      });
    }
  },

  /**
   * User Login
   */
  async login(req: Request, res: Response): Promise<Response> {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      // Authenticate user & generate token
      const { token, user } = await AuthService.login(req.body);

      logger.info(`User logged in: ${user.email}`);

      // Optional: Send token as an HTTP-only cookie for security
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure only in production
        sameSite: "strict",
      });

      return res.status(200).json({ success: true, token, user });
    } catch (error) {
      logger.error(`Login Error: ${error.message}`);

      return res.status(401).json({
        success: false,
        message: "Authentication failed.",
        error: error.message,
      });
    }
  },

  /**
   * User Logout (Optional)
   */
  async logout(req: Request, res: Response): Promise<Response> {
    try {
      res.clearCookie("auth_token");
      return res.status(200).json({ success: true, message: "Logged out successfully." });
    } catch (error) {
      logger.error(`Logout Error: ${error.message}`);
      return res.status(500).json({ success: false, message: "Logout failed." });
    }
  },
};

export default AuthController;

