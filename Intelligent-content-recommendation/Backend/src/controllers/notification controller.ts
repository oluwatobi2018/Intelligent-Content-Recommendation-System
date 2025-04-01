import { Request, Response } from 'express';
import NotificationService from '../services/notificationService';

class NotificationController {
    // Get all notifications for a user
    async getNotifications(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.userId;
            const notifications = await NotificationService.getNotifications(userId);
            return res.status(200).json({ success: true, data: notifications });
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Mark a notification as read
    async markAsRead(req: Request, res: Response): Promise<Response> {
        try {
            const notificationId = req.params.notificationId;
            const updatedNotification = await NotificationService.markAsRead(notificationId);
            return res.status(200).json({ success: true, data: updatedNotification });
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }

    // Create a new notification
    async createNotification(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, message, type } = req.body;
            const newNotification = await NotificationService.createNotification({ userId, message, type });
            return res.status(201).json({ success: true, data: newNotification });
        } catch (error) {
            console.error('Error creating notification:', error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

export default new NotificationController();