import React, { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { useSelector } from "react-redux";
import { MessageDay } from "./MessageDay.tsx";
import { IChatMessage, IOrganizedChatMessage } from "../../types/chat.ts";
import { TUser } from "../../types/auth.ts";
import Messages from "../../utils/organizeMessages.ts";
import { MessagePlaceholder } from "./MessagePlaceholder.tsx";

interface ChatMessagesProps {
  messages: IChatMessage[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

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
