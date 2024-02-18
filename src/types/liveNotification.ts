export type TLiveNotification = {
  userId: string;
  message: string;
};

export type TLiveNotificationList = {
  notifications: TLiveNotification[];
};

export type TLiveNotificationState = {
  liveNotification: TLiveNotificationList;
};

export type TLiveConfNotification = TLiveNotification & {
  videoConferenceId?: string;
  peerId?: string;
};
