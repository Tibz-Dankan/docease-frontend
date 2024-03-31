import { onlineStatusActions } from "../index";
import { TOnlineUserPayload } from "../../types/onlineStatus";

export const updateOnlineStatus = (userStatus: TOnlineUserPayload) => {
  return async (dispatch: any) => {
    dispatch(onlineStatusActions.updateStatus(userStatus));
  };
};

export const clearUserOnlineStatus = (userId: string) => {
  return async (dispatch: any) => {
    dispatch(onlineStatusActions.clearStatus(userId));
  };
};

export const clearAllOnlineStatuses = () => {
  return async (dispatch: any) => {
    dispatch(onlineStatusActions.clearAll());
  };
};
