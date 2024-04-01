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
import { updateOnlineStatus } from "../store/actions/onlineStatus";

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
      const parsedData = JSON.parse(event.data) as TStatus;
      const message = parsedData.message;
      if (message === "heartbeat" || message === "warmup") return;

      const parsedUserId = parsedData?.userId;
      const parsedUpdatedAt = parsedData?.updatedAt!;
      if (!parsedUserId || !parsedUpdatedAt) return;
      dispatch(
        updateOnlineStatus({ userId: parsedUserId, updatedAt: parsedUpdatedAt })
      );
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
