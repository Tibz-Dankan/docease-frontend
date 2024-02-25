import { chatActions } from "../index";
import { IChatMessage } from "../../types/chat";
import { TUser } from "../../types/auth";

export const updateChatRecipientList = (chatRecipientList: TUser[]) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateChatRecipientList({
        chatRecipientList: chatRecipientList,
      })
    );
  };
};

export const updateCurrentRecipient = (currentRecipient: TUser) => {
  return (dispatch: any) => {
    dispatch(
      chatActions.updateCurrentRecipient({
        currentRecipient: currentRecipient,
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

export const clearMessageList = () => {
  return (dispatch: any) => {
    dispatch(chatActions.clearMessageList());
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
