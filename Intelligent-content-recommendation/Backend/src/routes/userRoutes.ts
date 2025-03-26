import express from "express";
import UserController from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", authenticate, UserController.getUserProfile);

export default router;
