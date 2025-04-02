import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController';

const router = express.Router();

// Route to get all notifications
router.get('/', getNotifications);

// Route to mark a notification as read
router.patch('/:id/read', markAsRead);

export default router;