import { useContext } from 'react';
import { NotificationContext, NotificationType } from '@/contexts/NotificationContext';

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider');
  }

  const notify = (
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
  ) => {
    return context.addNotification({
      type,
      title,
      message,
      duration,
    });
  };

  return {
    notifications: context.notifications,
    notify,
    success: (title: string, message: string, duration?: number) =>
      notify('success', title, message, duration),
    error: (title: string, message: string, duration?: number) =>
      notify('error', title, message, duration),
    warning: (title: string, message: string, duration?: number) =>
      notify('warning', title, message, duration),
    info: (title: string, message: string, duration?: number) =>
      notify('info', title, message, duration),
    removeNotification: context.removeNotification,
  };
}
