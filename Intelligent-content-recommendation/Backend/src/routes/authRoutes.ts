
import express from "express";
import { body } from "express-validator";
import AuthController from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { requestLogger } from "../middleware/requestLogger";

const router = express.Router();

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  "/register",
  requestLogger,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  AuthController.register
);

/**
 * @route POST /auth/login
 * @desc Authenticate user and return token
 * @access Public
 */
router.post(
  "/login",
  requestLogger,
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  AuthController.login
);

export default router;
