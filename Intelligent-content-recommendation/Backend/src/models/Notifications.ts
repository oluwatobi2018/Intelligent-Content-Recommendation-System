import { Schema, model, Document } from 'mongoose';

interface INotification extends Document {
    userId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Notification = model<INotification>('Notification', NotificationSchema);

export default Notification;