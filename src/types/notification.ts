export type TNotification = {
  showCardNotification: boolean;
  cardNotificationType: string | null;
  cardMessage: string | null;
  cardNotificationTitle: string | null;
};

export type TNotificationState = {
  notification: TNotification;
};

export type TNotificationPayload = {
  title?: string;
  type: string;
  message: string;
};
