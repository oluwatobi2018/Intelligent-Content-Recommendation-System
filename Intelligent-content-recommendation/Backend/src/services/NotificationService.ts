class NotificationService {
    sendEmailNotification(to: string, subject: string, message: string): void {
        // Logic to send email notification
        console.log(`Email sent to ${to} with subject "${subject}" and message: ${message}`);
    }

    sendPushNotification(deviceId: string, title: string, body: string): void {
        // Logic to send push notification
        console.log(`Push notification sent to device ${deviceId} with title "${title}" and body: ${body}`);
    }

    sendSMSNotification(phoneNumber: string, message: string): void {
        // Logic to send SMS notification
        console.log(`SMS sent to ${phoneNumber} with message: ${message}`);
    }
}

export default new NotificationService();
