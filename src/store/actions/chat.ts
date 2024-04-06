import { chatActions } from "../index";
import {
  IChatMessage,
  IPostingMessage,
  TChatRecipient,
} from "../../types/chat";

export const updateChatRecipientList = (
  chatRecipientList: TChatRecipient[]
) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateChatRecipientList({
        chatRecipientList: chatRecipientList,
      })
    );
  };
};

export const updateChatRecipientListMessage = (message: IChatMessage) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateChatRecipientListMessage({
        message: message,
      })
    );
  };
};

export const addToRecipientMessageList = (message: IChatMessage) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.addToRecipientMessageList({
        message: message,
      })
    );
  };
};

export const updateCurrentRecipient = (currentRecipient: TChatRecipient) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateCurrentRecipient({
        currentRecipient: currentRecipient,
      })
    );
  };
};

export const updateCurrentRecipientMessage = (message: IChatMessage) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateCurrentRecipientMessage({
        message: message,
      })
    );
  };
};

export const updateCurrentRecipientMessageWithList = (
  messages: IChatMessage[]
) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateCurrentRecipientMessageWithList({
        messages: messages,
      })
    );
  };
};

// recipientId is currentUserId and senderId is the chatMateId
export const updateMessagesAsRead = (recipientId: string, senderId: string) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.markMessagesAsRead({
        recipientId: recipientId,
        senderId: senderId,
      })
    );
  };
};

export const updatePostingMessage = (postMessaging: IPostingMessage) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updatePostingMessage({
        postMessaging: postMessaging,
      })
    );
  };
};

export const clearPostingMessage = () => {
  return (dispatch: any) => {
    dispatch(chatActions.clearPostingMessage());
  };
};

export const updateStartChatRecipient = (
  startChatRecipient: TChatRecipient
) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateStartChatRecipient({
        startChatRecipient: startChatRecipient,
      })
    );
  };
};

export const updateMessageList = (messageList: IChatMessage[]) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateMessageList({
        messageList: messageList,
      })
    );
  };
};

export const addToMessageList = (message: IChatMessage) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.addToMessageList({
        message: message,
      })
    );
  };
};

export const showChat = () => {
  return (dispatch: any) => {
    dispatch(chatActions.showChat());
  };
};

export const hideChat = () => {
  return (dispatch: any) => {
    dispatch(chatActions.hideChat());
  };
};

export const showChatRecipientList = () => {
  return (dispatch: any) => {
    dispatch(chatActions.showChatRecipientList());
  };
};

export const hideChatRecipientList = () => {
  return (dispatch: any) => {
    dispatch(chatActions.hideRecipientList());
  };
};
