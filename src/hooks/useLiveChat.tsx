import { useEffect, useRef } from "react";
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
import { IChatMessage, TChatState } from "../types/chat";

export const useLiveChat = async () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  );
  const userId = useSelector((state: TAuthState) => state.auth.user?.userId);
  const chatRecipientList = useSelector(
    (state: TChatState) => state.chat.chatRecipientList
  );

  const dispatch: any = useDispatch();
  const effectRan = useRef(false);

  // const scrollToBottom = () => {
  //   // Delay scrolling to bottom to allow element attain  its full height
  //   setTimeout(() => {
  //     const viewElement = document.querySelector("#message-container")!;
  //     viewElement.scrollIntoView({ behavior: "smooth" });
  //     viewElement.scrollTop = viewElement?.scrollHeight;
  //   }, 50);
  // };

  useEffect(() => {
    if (effectRan.current == true) return;

    if (!accessToken || !userId) return;
    const eventSource = new EventSourcePolyfill(`${url}/chat/get-live-chat`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const onmessage = async (event: any) => {
      const parsedData = JSON.parse(event.data);
      const message = parsedData.message;
      const parsedUserId: string = parsedData.recipientId;
      if (message === "heartbeat" || message === "warmup") return;
      if (parsedUserId !== userId) return;

      const newMessage: IChatMessage = parsedData.message;

      // prevent unnecessary updates of the chat messages
      const recipient = chatRecipientList.find(
        (recipient) => recipient.userId === newMessage.senderId
      );

      const existingMessage = recipient?.messages.find(
        (message) => message.messageId === newMessage.messageId
      );

      if (existingMessage) return;

      dispatch(updateChatRecipientListMessage(newMessage));
      dispatch(updateCurrentRecipientMessage(newMessage));
      // scrollToBottom();

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

    return () => {
      effectRan.current = true;
    };
  }, [accessToken]);

  return {};
};
