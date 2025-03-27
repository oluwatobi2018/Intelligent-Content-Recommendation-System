import express from "express";
import UserController from "../controllers/userController";
import { authenticateUser } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

/**
 * @route   GET /users/profile
 * @desc    Retrieve authenticated user profile
 * @access  Private (Requires Authentication)
 */
router.get("/profile", authenticateUser, validateRequest, UserController.getUserProfile);

export default router;

