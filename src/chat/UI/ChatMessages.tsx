import React, { Fragment, useEffect, useRef, useState } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { useDispatch, useSelector } from "react-redux";
import { MessageDay } from "./MessageDay.tsx";
import {
  IChatMessage,
  IOrganizedChatMessage,
  TChatRecipient,
  // TChatState,
} from "../../types/chat.ts";
import { TAuthState, TUser } from "../../types/auth.ts";
import Messages from "../../utils/organizeMessages.ts";
import { MessagePlaceholder } from "./MessagePlaceholder.tsx";
import { generateChatRoomId } from "../../utils/generateChatRoomId.ts";
import {
  //  markMessagesAsRead,
  getMessagesByChatRoom,
} from "../API/index.ts";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification.ts";
import { MessageLoader } from "./MessageLoader.tsx";
import { updateCurrentRecipientMessageWithList } from "../../store/actions/chat.ts";
// import { updateMessagesAsRead } from "../../store/actions/chat.ts";

interface ChatMessagesProps {
  messages: IChatMessage[];
  recipient: TChatRecipient;
}

export const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  // const recipient = useSelector(
  //   (state: TChatState) => state.chat.currentRecipient
  // );
  const recipient = props.recipient;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const cursorId = recipient.messages[0].messageId;
  // const chatRoomId = generateChatRoomId(currentUser, recipient);
  const userId = recipient.userId;
  console.log("userId:::=>", userId);

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken!
  );

  const effectRan = useRef(false);

  const dispatch: any = useDispatch();

  const messages = new Messages(currentUser, recipient).organize(
    props.messages
  );
  const [chatRoomId, setChatRoomId] = useState<string>(
    generateChatRoomId(currentUser, recipient)
  );
  const [cursorId, setCursorId] = useState<string>(messages[0].messageId!);

  console.log("recipient:::", recipient);

  const isPrimaryButNotFirstMessage = (
    message: IOrganizedChatMessage,
    index: number
  ): boolean => {
    if (message.isPrimaryMessage && index !== 0) return true;
    return false;
  };

  const isPrimaryMessageWithOutFile = (
    message: IOrganizedChatMessage
  ): boolean => {
    if (message.isPrimaryMessage) return true;
    return false;
  };

  const isSecondaryMessageWithOutFile = (
    message: IOrganizedChatMessage
  ): boolean => {
    if (!message.isPrimaryMessage) return true;
    return false;
  };

  // const markMessagesAsReadHandler = async () => {
  //   const currentUserId = currentUser.userId!;

  //   const unReadMessage = recipient.messages.find((message) => {
  //     return message.isRead === false && message.recipientId === currentUserId;
  //   });
  //   if (!unReadMessage) return;

  //   const lastMessageCreatedAt =
  //     recipient.messages[recipient.messages.length - 1].createdAt;

  //   if (!lastMessageCreatedAt || !currentUserId) return;

  //   await markMessagesAsRead({
  //     userId: currentUserId,
  //     createdAt: lastMessageCreatedAt,
  //     accessToken: accessToken,
  //   });
  //   dispatch(updateMessagesAsRead(currentUserId, recipient.userId));
  // };

  useEffect(() => {
    const setChatRoomIdAndCursorId = () => {
      setChatRoomId(() => generateChatRoomId(currentUser, recipient));
      setCursorId(() => messages[0].messageId!);
    };
    setChatRoomIdAndCursorId();

    return () => {
      setChatRoomId(() => "");
      setCursorId(() => "");
    };
  }, [chatRoomId, cursorId]);

  useEffect(() => {
    if (effectRan.current === false) {
      const viewElement = document.querySelector("#message-container")!;

      viewElement?.addEventListener("scrollend", async (_) => {
        const isScrolledToTop = viewElement.scrollTop === 0;

        if (isScrolledToTop) {
          const containsRecipientId = chatRoomId.includes(recipient.userId);
          const isRecipientMessageId =
            recipient.messages[0].messageId === cursorId;

          if (!containsRecipientId || !isRecipientMessageId) return;
          if (!cursorId || !chatRoomId) return;

          try {
            setIsLoading(() => true);
            const response = await getMessagesByChatRoom({
              chatRoomId: chatRoomId,
              cursorId: cursorId,
              accessToken: accessToken,
            });
            setIsLoading(() => false);

            if (!response?.data?.messages) return;
            if (!response?.data?.messages[0]) return;

            console.log("response for messages", response?.data?.messages);
            dispatch(
              updateCurrentRecipientMessageWithList(response?.data?.messages)
            );
          } catch (error: any) {
            setIsLoading(() => false);
            dispatch(
              showCardNotification({ type: "error", message: error.message })
            );
            setTimeout(() => {
              dispatch(hideCardNotification());
            }, 5000);
          }
        }

        // if (isScrolledToTop) {
        //   getMessageByChatRoomHandler();
        // }
      });
      return () => {
        effectRan.current = true;
        setChatRoomId(() => "");
        setCursorId(() => "");
      };
    }
  }, [chatRoomId, cursorId, dispatch]);

  return (
    <Fragment>
      <div
        className="p-4 overflow-x-hidden w-full h-[58vh]
         sm:h-[50vh] relative transition-all"
        id="message-container"
      >
        {!messages[0] && <MessagePlaceholder />}
        {messages[0] && (
          <div
          // className="overflow-x-hidden w-full h-[58vh] max-h-[58vh]
          // sm:max-h-auto sm:h-[50vh] relative"
          // id="message-container"
          >
            {isLoading && <MessageLoader />}
            {messages.map((message, index) => {
              return (
                <div
                  key={index + 1}
                  className={`${
                    isPrimaryButNotFirstMessage(message, index) && "mt-4"
                  }`}
                >
                  {message.showDay && (
                    <MessageDay createdAt={message.createdAt} />
                  )}
                  {isPrimaryMessageWithOutFile(message) && (
                    <MessagePrimary msg={message} />
                  )}
                  {isSecondaryMessageWithOutFile(message) && (
                    <MessageSecondary msg={message} />
                  )}
                </div>
              );
            })}
            <div id="below-messages" className="h-1 w-full"></div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
