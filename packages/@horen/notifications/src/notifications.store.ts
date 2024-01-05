import React from 'react';
import { HorenStore, createStore } from '@horen/store';

export interface NotificationData {
  id?: string;
  title?: string;
  message?: React.ReactNode;
  onOpen?(notify: NotificationData): void;
  onClose?(notify: NotificationData): void;
}

export interface NotificationState {
  notifications: NotificationData[],
}

export type NotificationStore = HorenStore<NotificationState>;

export function createNotificationStore(): NotificationStore {
  return createStore<NotificationState>({
    notifications: [],
  });
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

