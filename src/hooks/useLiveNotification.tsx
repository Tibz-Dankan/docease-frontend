import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../store/actions/notification";
import { TAuthState } from "../types/auth";
import { url } from "../store";
import { EventSourcePolyfill } from "event-source-polyfill";
import { TLiveNotification } from "../types/liveNotification";
import { updateLiveNotification } from "../store/actions/liveNotification";

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
      console.log("event data", event);
      const parsedData = JSON.parse(event.data) as TLiveNotification;
      const message = parsedData.message;
      const parsedUserId = parsedData.userId;
      if (message === "heartbeat" || message === "warmup") return;
      if (parsedUserId !== userId) return;

      dispatch(updateLiveNotification(parsedData));
      dispatch(showCardNotification({ type: "info", message: message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    };

    const onerror = async (error: any) => {
      if (error.status === 401) {
        console.log("live notify error", error);
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
