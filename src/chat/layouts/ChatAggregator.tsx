import React, { Fragment } from "react";
import { ChatHeader } from "../UI/ChatHeader";
import { ChatForm } from "../UI/ChatForm";
import { ChatMessages } from "../UI/ChatMessages";
import { useSelector } from "react-redux";
import { TChatState } from "../../types/chat";

export const ChatAggregator: React.FC = () => {
  const recipient = useSelector(
    (state: TChatState) => state.chat.currentRecipient
  );

  const messageList = recipient.messages;

  const showMessageInbox: boolean = !!recipient.userId;
  // TODO: Set query params on every inbox entering

  return (
    <Fragment>
      <div
        className="w-full sm:w-96 bg-gray-50 sm:rounded-t-md
         shadow-md border-[1px] border-gray-300 flex flex-col
         items-start h-[100vh] sm:h-auto animate-opacityZeroToFull
         relative"
      >
        <ChatHeader
          recipientName={`${recipient.firstName} ${recipient.lastName}`}
          recipientRole={`${recipient.role}`}
          recipientImageUrl={`${recipient.imageUrl}`}
          onChatClose={() => {}}
        />
        {showMessageInbox && (
          <ChatMessages messages={messageList} recipient={recipient} />
        )}
        <ChatForm />
      </div>
    </Fragment>
  );
};
