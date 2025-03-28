import express from 'express';
import { getRecommendations } from '../controllers/recommendationController';
import cacheMiddleware from '../middlewares/cacheMiddleware';

const router = express.Router();

// Route to get recommendations with caching
router.get('/recommendations', cacheMiddleware, getRecommendations);

export default router;