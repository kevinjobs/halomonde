import React from 'react';

export interface NotificationData {
  id?: string;
  title?: string;
  message?: React.ReactNode;
  onOpen?(notify: NotificationData): void;
  onClose?(notify: NotificationData): void;
}

export interface NotificationStore {
  notifications: NotificationData[],
}

export function createNotificationStore(): NotificationStore {
  return {
    notifications: [],
  }
}

export const notificationStore = createNotificationStore();

export function showNotification(
  notification: NotificationData,
  store: NotificationStore = notificationStore
) {
  
}

export function hideNotification(id: string) {

}

export function clearNotifications() {}

