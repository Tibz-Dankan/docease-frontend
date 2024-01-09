import { notificationActions } from "../index";
import { TNotificationPayload } from "../../types/notification";

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
