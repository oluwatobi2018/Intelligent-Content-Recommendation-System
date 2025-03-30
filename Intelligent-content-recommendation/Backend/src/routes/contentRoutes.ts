import express from "express";
import { body, param } from "express-validator";
import ContentController from "../controllers/contentController";
import { authenticateUser } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { requestLogger } from "../middleware/requestLogger";
import { cacheMiddleware } from "../utils/cache";

const router = express.Router();

/**
 * @route GET /content
 * @desc Get all content
 * @access Public
 */
router.get("/", requestLogger, ContentController.getAllContent);

/**
 * @route POST /content
 * @desc Create new content
 * @access Private
 */
router.post(
  "/",
  requestLogger,
  authenticateUser,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("imageUrl").optional().isURL().withMessage("Image URL must be valid"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
  ],
  validateRequest,
  ContentController.createContent
);

/**
 * @route DELETE /content/:id
 * @desc Delete content by ID
 * @access Private
 */
router.delete(
  "/:id",
  requestLogger,
  authenticateUser,
  [param("id").isMongoId().withMessage("Invalid content ID")],
  validateRequest,
  ContentController.deleteContent
);

export default router;

router.get("/trending", cacheMiddleware, getTrendingContent);

