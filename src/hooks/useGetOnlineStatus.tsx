import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../store/actions/notification";
import { TAuthState } from "../types/auth";
import { url } from "../store";
import { EventSourcePolyfill } from "event-source-polyfill";
import { TStatus } from "../types/status";

export const useGetOnlineStatus = async () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  );
  const userId = useSelector((state: TAuthState) => state.auth.user?.userId);

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (!accessToken || !userId) return;
    const eventSource = new EventSourcePolyfill(`${url}/status/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const onmessage = async (event: any) => {
      console.log("event online data", event);
      const parsedData = JSON.parse(event.data) as TStatus;
      const message = parsedData.message;
      const parsedUserId = parsedData.userId;
      if (message === "heartbeat" || message === "warmup") return;
      if (parsedUserId !== userId) return;

      //TODO: to define format of updating user status on the UI
    };

    const onerror = async (error: any) => {
      if (error.status === 401) {
        console.log("online status error", error);
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
