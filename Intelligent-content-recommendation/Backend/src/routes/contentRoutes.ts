import express from "express";
import ContentController from "../controllers/contentController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", ContentController.getAllContent);
router.post("/", authenticate, ContentController.createContent);
router.delete("/:id", authenticate, ContentController.deleteContent);

export default router;
