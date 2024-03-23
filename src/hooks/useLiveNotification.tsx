import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
  AddServerNotificationToList,
} from "../store/actions/notification";
import { TAuthState } from "../types/auth";
import { url } from "../store";
import { EventSourcePolyfill } from "event-source-polyfill";
import { TLiveConfNotification } from "../types/liveNotification";
// import { updateLiveNotification } from "../store/actions/liveNotification";
import {
  updateRequestConnectVideoConference,
  updateVideoConferenceConnected,
} from "../store/actions/videoConference";
import { TServerNotification } from "../types/notification";

export const useLiveNotification = async () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  );
  const userId = useSelector((state: TAuthState) => state.auth.user?.userId);

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (!accessToken || !userId) return;
    const eventSource = new EventSourcePolyfill(
      `${url}/notifications/get-live-notifications`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const onmessage = async (event: any) => {
      const parsedData = JSON.parse(event.data) as TLiveConfNotification;
      const message = parsedData.message;
      const parsedUserId = parsedData.userId;
      if (message === "heartbeat" || message === "warmup") return;
      if (parsedUserId !== userId) return;
      if (message === "confconnected") {
        dispatch(updateVideoConferenceConnected(parsedData.peerId!));
        return;
      }

      if (parsedUserId !== userId) return;

      const videoConferenceId: string = parsedData.videoConferenceId!;
      const requestConnectMessage: string = parsedData.message;

      if (videoConferenceId && requestConnectMessage) {
        dispatch(
          updateRequestConnectVideoConference(
            videoConferenceId,
            requestConnectMessage
          )
        );
        return;
      }

      const parsedNotificationData = JSON.parse(
        event.data
      ) as TServerNotification;

      // dispatch(updateLiveNotification(parsedData));
      dispatch(AddServerNotificationToList(parsedNotificationData));
      dispatch(showCardNotification({ type: "info", message: message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    };

    const onerror = async (error: any) => {
      if (error.status === 401) {
        eventSource.close();
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      }
    };

    eventSource.onmessage = onmessage;
    eventSource.onerror = onerror;
  }, [dispatch, accessToken]);

  return {};
};
