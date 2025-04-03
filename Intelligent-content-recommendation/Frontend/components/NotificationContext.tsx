import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
        const id = Math.random().toString(36).substr(2, 9); // Generate a random ID
        setNotifications((prev) => [...prev, { id, message, type }]);
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
