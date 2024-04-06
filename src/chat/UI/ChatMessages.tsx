import React, { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { useSelector } from "react-redux";
import { MessageDay } from "./MessageDay.tsx";
import {
  IChatMessage,
  IOrganizedChatMessage,
  // TChatRecipient,
  TChatState,
} from "../../types/chat.ts";
import { TUser } from "../../types/auth.ts";
import Messages from "../../utils/organizeMessages.ts";
import { MessagePlaceholder } from "./MessagePlaceholder.tsx";
// import { markMessagesAsRead } from "../API/index.ts";
// import { updateMessagesAsRead } from "../../store/actions/chat.ts";

interface ChatMessagesProps {
  messages: IChatMessage[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient = useSelector(
    (state: TChatState) => state.chat.currentRecipient
  );

  // const accessToken = useSelector(
  //   (state: TAuthState) => state.auth.accessToken!
  // );

  // const dispatch: any = useDispatch();

  const messages = new Messages(currentUser, recipient).organize(
    props.messages
  );

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

  // useEffect(() => {
  //   const scrollToBottom = () => {
  //     // Delay scrolling to bottom to allow element attain its full height
  //     setTimeout(() => {
  //       const viewElement = document.querySelector("#message-container")!;
  //       // viewElement.scrollIntoView({ behavior: "smooth" });
  //       // viewElement.scrollTop = viewElement?.scrollHeight;

  //       // Check if scrolled to the bottom
  //       const isScrolledToBottom =
  //         viewElement.scrollTop >=
  //         viewElement.scrollHeight - viewElement.clientHeight;

  //       if (!isScrolledToBottom) return;
  //       // Mark messages as read if any on reaching the bottom
  //       viewElement.addEventListener("scrollend", (_) => {
  //         markMessagesAsReadHandler();
  //       });
  //     }, 50);
  //   };

  //   scrollToBottom();
  // }, []);

  return (
    <Fragment>
      <div
        className="p-4 overflow-x-hidden w-full h-[58vh]
         sm:h-[50vh] relative"
        id="message-container"
      >
        {!messages[0] && <MessagePlaceholder />}
        {messages[0] && (
          <div
          // className="overflow-x-hidden w-full h-[58vh] max-h-[58vh]
          // sm:max-h-auto sm:h-[50vh] relative"
          // id="message-container"
          >
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
