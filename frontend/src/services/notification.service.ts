// Notification Service
export interface NotificationData {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export class NotificationService {
  private static notifications: NotificationData[] = [];
  private static listeners: ((notifications: NotificationData[]) => void)[] = [];

  // Add notification
  static add(notification: NotificationData): void {
    const id = Math.random().toString(36).substr(2, 9);
    const notificationWithId = { ...notification, id };
    
    this.notifications.push(notificationWithId as any);
    this.notifyListeners();

    // Auto remove after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, notification.duration);
    }
  }

  // Remove notification
  static remove(id: string): void {
    this.notifications = this.notifications.filter(n => (n as any).id !== id);
    this.notifyListeners();
  }

  // Clear all notifications
  static clear(): void {
    this.notifications = [];
    this.notifyListeners();
  }

  // Get all notifications
  static getAll(): NotificationData[] {
    return [...this.notifications];
  }

  // Subscribe to notifications
  static subscribe(listener: (notifications: NotificationData[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify listeners
  private static notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  // Convenience methods
  static success(title: string, message?: string, duration?: number): void {
    this.add({ type: 'success', title, message, duration });
  }

  static error(title: string, message?: string, duration?: number): void {
    this.add({ type: 'error', title, message, duration });
  }

  static warning(title: string, message?: string, duration?: number): void {
    this.add({ type: 'warning', title, message, duration });
  }

  static info(title: string, message?: string, duration?: number): void {
    this.add({ type: 'info', title, message, duration });
  }
}
