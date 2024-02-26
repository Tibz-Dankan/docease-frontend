import React, { Fragment } from "react";
import { ChatLayout } from "../layouts/ChatLayout";
import { ShowChatRecipientList } from "../UI/ShowChatRecipientList";
import { Socket } from "socket.io-client";

interface ChatProps {
  socket: Socket;
}

export const Chat: React.FC<ChatProps> = (props) => {
  return (
    <Fragment>
      <div>
        <ChatLayout socket={props.socket} />
        <ShowChatRecipientList />
      </div>
    </Fragment>
  );
};
