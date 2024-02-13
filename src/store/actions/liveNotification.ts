import { TLiveNotification } from "../../types/liveNotification";
import { liveNotificationActions } from "../index";

export const updateLiveNotification = ({
  userId,
  message,
}: TLiveNotification) => {
  return (dispatch: any) => {
    dispatch(
      liveNotificationActions.updateLiveNotifications({
        userId: userId,
        message: message,
      })
    );
  };
};

export const clearLiveNotifications = () => {
  return (dispatch: any) => {
    dispatch(liveNotificationActions.clearLiveNotifications());
  };
};
