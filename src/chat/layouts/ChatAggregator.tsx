import React, { Fragment } from "react";
import { ChatHeader } from "../UI/ChatHeader";
import { ChatForm } from "../UI/ChatForm";
import { ChatMessages } from "../UI/ChatMessages";
import { useSelector } from "react-redux";
import { TUser } from "../../types/auth";
import { TChatState } from "../../types/chat";

export const ChatAggregator: React.FC = () => {
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

  const theRecipient = useSelector(
    (state: TChatState) => state.chat.currentRecipient
  );

  const messageList = theRecipient.messages;

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
        <ChatMessages messages={messageList} />
        <ChatForm />
      </div>
    </Fragment>
  );
};
