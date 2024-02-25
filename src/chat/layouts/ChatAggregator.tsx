import React, { Fragment, useState, useRef, useEffect } from "react";
import { ChatHeader } from "../UI/ChatHeader";
import { ChatForm } from "../UI/ChatForm";
import { ChatMessages } from "../UI/ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import { MessageLoader } from "../UI/MessageLoader";
import { TUser } from "../../types/auth";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { addToMessageList, updateMessageList } from "../../store/actions/chat";
import { IChatMessage } from "../../types/chat";
import { generateChatRoomId } from "../../utils/generateChatRoomId";
import { getChatMessages } from "../API";

interface ChatAggregatorProps {
  socket: Socket;
}

export const ChatAggregator: React.FC<ChatAggregatorProps> = (props) => {
  const [chatMessage, setChatMessage] = useState<string>("");

  const onSubmitHandler = (message: string) => {
    setChatMessage(message);
  };

  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

  const createdAt = new Date().toISOString();
  const chatRoomId = generateChatRoomId(currentUser, recipient);
  const effectRan = useRef(false);
  const dispatch: any = useDispatch();
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
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

  const newMessage: IChatMessage = {
    senderId: currentUser.userId,
    recipientId: recipient.userId,
    chatRoomId: chatRoomId,
    message: chatMessage,
    isRead: false,
    isDelivered: false,
    createdAt: createdAt,
  };

  useEffect(() => {
    const sendMessageHandler = () => {
      if (!chatMessage) return;
      dispatch(addToMessageList(newMessage));
      props.socket.emit("sendChatMessage", newMessage);
    };
    sendMessageHandler();
  }, [chatMessage]);

  useEffect(() => {
    if (effectRan.current === false) {
      props.socket.on("receiveChatMessage", (message: IChatMessage) => {
        dispatch(addToMessageList(message));
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [props.socket]);

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
        <ChatForm onSubmit={onSubmitHandler} />
      </div>
    </Fragment>
  );
};
