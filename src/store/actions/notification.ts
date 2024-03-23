import { notificationActions } from "../index";
import {
  TNotificationPayload,
  TServerNotification,
} from "../../types/notification";

export const showCardNotification = ({
  type,
  message,
}: TNotificationPayload) => {
  return (dispatch: any) => {
    dispatch(
      notificationActions.showCardNotification({ type: type, message: message })
    );
  };
};

export const hideCardNotification = () => {
  return (dispatch: any) => {
    dispatch(notificationActions.hideCardNotification());
  };
};

export const updateServerNotifications = (
  notifications: TServerNotification[]
) => {
  return (dispatch: any) => {
    dispatch(
      notificationActions.updateServerNotifications({
        notifications: notifications,
      })
    );
  };
};

export const updateOneServerNotification = (
  notification: TServerNotification
) => {
  return (dispatch: any) => {
    dispatch(
      notificationActions.updateOneServerNotification({
        notification: notification,
      })
    );
  };
};

export const AddServerNotificationToList = (
  notification: TServerNotification
) => {
  return (dispatch: any) => {
    dispatch(
      notificationActions.AddServerNotificationToList({
        notification: notification,
      })
    );
  };
};

export const clearNotification = () => {
  return (dispatch: any) => {
    dispatch(notificationActions.clearNotification());
  };
};
