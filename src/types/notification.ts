export type TNotification = {
  showCardNotification: boolean;
  cardNotificationType: string | null;
  cardMessage: string | null;
  cardNotificationTitle: string | null;
  notifications: TServerNotification[];
};

export type TNotificationState = {
  notification: TNotification;
};

export type TNotificationPayload = {
  title?: string;
  type: string;
  message: string;
};

export type TServerNotification = {
  notificationId: string;
  userId: string;
  message: string;
  link: string;
  isRead?: boolean;
  createdAt: string;
  updatedAt?: string;
};
