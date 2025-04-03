// services/notificationService.ts

export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: Date;
}

export class NotificationService {
    private notifications: Notification[] = [];

    // Add a new notification
    addNotification(message: string, type: 'success' | 'error' | 'info' | 'warning'): Notification {
        const notification: Notification = {
            id: this.generateId(),
            message,
            type,
            timestamp: new Date(),
        };
        this.notifications.push(notification);
        return notification;
    }

    // Get all notifications
    getNotifications(): Notification[] {
        return this.notifications;
    }

    // Remove a notification by ID
    removeNotification(id: string): void {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
    }

    // Clear all notifications
    clearNotifications(): void {
        this.notifications = [];
    }

    // Generate a unique ID for notifications
    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}

export const notificationService = new NotificationService();