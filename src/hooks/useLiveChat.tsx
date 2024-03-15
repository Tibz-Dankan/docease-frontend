import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../store/actions/notification";
import { TAuthState } from "../types/auth";
import { url } from "../store";
import { EventSourcePolyfill } from "event-source-polyfill";
import {
  updateChatRecipientListMessage,
  updateCurrentRecipientMessage,
} from "../store/actions/chat";
import { IChatMessage } from "../types/chat";

export const useLiveChat = async () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  );
  const userId = useSelector((state: TAuthState) => state.auth.user?.userId);

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (!accessToken || !userId) return;
    const eventSource = new EventSourcePolyfill(`${url}/chat/get-live-chat`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const onmessage = async (event: any) => {
      console.log("chat message event data", event);
      const parsedData = JSON.parse(event.data);
      const message = parsedData.message;
      const parsedUserId: string = parsedData.recipientId;
      if (message === "heartbeat" || message === "warmup") return;
      if (parsedUserId !== userId) return;

      const newMessage: IChatMessage = parsedData.message;
      console.log("newMessage from server: ", newMessage);

      dispatch(updateChatRecipientListMessage(newMessage));
      dispatch(updateCurrentRecipientMessage(newMessage));

      dispatch(
        showCardNotification({ type: "info", message: "You have new message" })
      );
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
