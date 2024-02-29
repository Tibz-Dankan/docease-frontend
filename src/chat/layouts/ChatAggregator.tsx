// import React, { Fragment, useState, useRef, useEffect } from "react";
import React, { Fragment, useEffect } from "react";
import { ChatHeader } from "../UI/ChatHeader";
import { ChatForm } from "../UI/ChatForm";
import { ChatMessages } from "../UI/ChatMessages";
import { useDispatch, useSelector } from "react-redux";
// import { Socket } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import { MessageLoader } from "../UI/MessageLoader";
import { TAuthState, TUser } from "../../types/auth";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { addToMessageList, updateMessageList } from "../../store/actions/chat";
import { IChatMessage } from "../../types/chat";
import { generateChatRoomId } from "../../utils/generateChatRoomId";
import { getChatMessages } from "../API";
import { url } from "../../store";
import { EventSourcePolyfill } from "event-source-polyfill";
// import { TLiveConfNotification } from "../../types/liveNotification";
// import { updateLiveNotification } from "../../store/actions/liveNotification";

// interface ChatAggregatorProps {
//   socket: Socket;
// }

// export const ChatAggregator: React.FC<ChatAggregatorProps> = (props) => {
export const ChatAggregator: React.FC = () => {
  // const [chatMessage, setChatMessage] = useState<string>("");
  // const [isSocketConnected, setIsSocketConnected] = useState<boolean>(true); // Track socket connection status

  // const onSubmitHandler = (message: string) => {
  //   setChatMessage(message);
  // };

  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

  const chatRoomId = generateChatRoomId(currentUser, recipient);
  // const effectRan = useRef(false);
  const dispatch: any = useDispatch();
  const accessToken: string = useSelector(
    (state: TAuthState) => state.auth.accessToken!
  );

  const { isLoading } = useQuery(
    [`${chatRoomId}-messageList`],
    () => {
      return getChatMessages({
        chatRoomId: chatRoomId,
        accessToken: accessToken,
      });
    },
    {
      onSuccess: (data: any) => {
        dispatch(updateMessageList(data.data.messages));
      },
      onError: (error: any) => {
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      },
    }
  );

  // const newMessage: IChatMessage = {
  //   senderId: currentUser.userId,
  //   recipientId: recipient.userId,
  //   chatRoomId: chatRoomId,
  //   message: chatMessage,
  //   isRead: false,
  //   isDelivered: false,
  //   createdAt: createdAt,
  // };

  // useEffect(() => {
  //   const sendMessageHandler = () => {
  //     if (!chatMessage) return;
  //     dispatch(addToMessageList(newMessage));
  //     props.socket.emit("sendChatMessage", newMessage);
  //   };
  //   sendMessageHandler();
  // }, [chatMessage]);

  // useEffect(() => {
  //   if (effectRan.current === false) {
  //     props.socket.on("receiveChatMessage", (message: IChatMessage) => {
  //       dispatch(addToMessageList(message));
  //     });
  //     setIsSocketConnected(true); // Set socket connection status to true when socket is connected
  //     return () => {
  //       effectRan.current = true;
  //     };
  //   }
  // }, [props.socket]);

  // useEffect(() => {
  //   const handleWindowBeforeUnload = () => {
  //     if (isSocketConnected) {
  //       props.socket.close(); // Close socket connection only if it's connected
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleWindowBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleWindowBeforeUnload);
  //   };
  // }, [isSocketConnected, props.socket]);

  const userId = useSelector((state: TAuthState) => state.auth.user?.userId);

  useEffect(() => {
    if (!accessToken || !userId) return;
    const eventSource = new EventSourcePolyfill(`${url}/chat/get-live-chat`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const onmessage = async (event: any) => {
      console.log("event data", event);
      const parsedData = JSON.parse(event.data);
      const message = parsedData.message;
      const parsedUserId: string = parsedData.recipientId;
      if (message === "heartbeat" || message === "warmup") return;
      if (parsedUserId !== userId) return;

      const newMessage: IChatMessage = parsedData.message;
      console.log("newMessage from server: ", newMessage);
      dispatch(addToMessageList(newMessage));

      // dispatch(updateLiveNotification(parsedData));
      dispatch(
        showCardNotification({ type: "info", message: "You have new message" })
      );
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

  const messageList: IChatMessage[] = useSelector(
    (state: any) => state.chat.messageList
  );

  return (
    <Fragment>
      <div
        className="w-full sm:w-96 bg-gray-50 sm:rounded-md shadow-2xl
         p-4 pt-3 borders-[1px] border-gray-200 space-y-4 flex flex-col
          items-start h-[100vh] sm:h-auto animate-opacityZeroToFull relative"
      >
        <ChatHeader
          recipientName={`${recipient.firstName} ${recipient.lastName}`}
          recipientRole={`${recipient.role}`}
          recipientImageUrl={`${recipient.imageUrl}`}
          onChatClose={() => {}}
        />
        {isLoading && <MessageLoader />}
        <ChatMessages messages={messageList} />
        {/* <ChatForm onSubmit={onSubmitHandler} /> */}
        <ChatForm />
      </div>
    </Fragment>
  );
};
