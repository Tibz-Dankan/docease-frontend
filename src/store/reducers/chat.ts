import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TChat,
  TCurrentRecipientPayload,
  TMessageListPayload,
  TMessagePayload,
  TPostingMessagePayload,
  TRecipientListPayload,
  TRecipientMessagePayload,
  TStartChatRecipientPayload,
} from "../../types/chat";

const initialState: TChat = {
  chatRecipientList: [],
  currentRecipient: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "patient",
    imageUrl: null,
    createdAt: "",
    updatedAt: "",
    messages: [],
  },
  startChatRecipient: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "patient",
    imageUrl: null,
    createdAt: "",
    updatedAt: "",
    messages: [],
  },
  messageList: [],
  postMessaging: {
    chatRoomId: "",
    senderId: "",
    recipientId: "",
    message: "",
    isRead: false,
    isDelivered: false,
    createdAt: "",
    isPosting: false,
  },
  showChat: false,
  showChatRecipientList: false,
};
export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    updateChatRecipientList(
      state,
      action: PayloadAction<TRecipientListPayload>
    ) {
      state.chatRecipientList = action.payload.chatRecipientList;
    },

    //Add messages from backend(recipient user) to the recipient list
    updateChatRecipientListMessage(
      state,
      action: PayloadAction<TRecipientMessagePayload>
    ) {
      const recipientList = state.chatRecipientList;

      const recipient = recipientList.find((recipient) => {
        return recipient.userId === action.payload.message.senderId;
      });
      if (!recipient) return;

      const message = recipient.messages.find(
        (message) => message.messageId === action.payload.message.messageId
      );
      if (message) return;
      recipient.messages.push(action.payload.message);

      if (recipientList.length === 1) {
        state.chatRecipientList = [recipient];
        return;
      }

      const filteredRecipientList = recipientList.filter((recipient) => {
        return recipient.userId !== action.payload.message.senderId;
      });
      filteredRecipientList.unshift(recipient);
      state.chatRecipientList = filteredRecipientList;
    },

    //Add messages from current device user to the recipient list
    addToRecipientMessageList(
      state,
      action: PayloadAction<TRecipientMessagePayload>
    ) {
      const recipientList = state.chatRecipientList;

      const recipient = recipientList.find((recipient) => {
        return recipient.userId === action.payload.message.recipientId;
      });
      if (!recipient) return;
      recipient.messages.push(action.payload.message);

      if (recipientList.length === 1) {
        state.chatRecipientList = [recipient];
        return;
      }

      const filteredRecipientList = recipientList.filter((recipient) => {
        return recipient.userId !== action.payload.message.recipientId;
      });
      filteredRecipientList.unshift(recipient);
      state.chatRecipientList = filteredRecipientList;
    },

    updateCurrentRecipient(
      state,
      action: PayloadAction<TCurrentRecipientPayload>
    ) {
      state.currentRecipient = action.payload.currentRecipient;
    },

    // updating messages coming from backend(recipient user)
    updateCurrentRecipientMessage(
      state,
      action: PayloadAction<TRecipientMessagePayload>
    ) {
      const recipient = state.currentRecipient;
      if (recipient.userId !== action.payload.message.senderId) return;

      const message = recipient.messages.find(
        (message) => message.messageId === action.payload.message.messageId
      );
      if (message) return;

      recipient.messages.push(action.payload.message);
      state.currentRecipient = recipient;
    },

    // Adding messages coming from current device user
    addToMessageList(state, action: PayloadAction<TMessagePayload>) {
      const recipient = state.currentRecipient;
      if (recipient.userId !== action.payload.message.recipientId) return;

      recipient.messages.push(action.payload.message);
      state.currentRecipient = recipient;
    },

    updatePostingMessage(state, action: PayloadAction<TPostingMessagePayload>) {
      state.postMessaging = action.payload.postMessaging;
    },

    clearPostingMessage(state) {
      state.postMessaging = {
        chatRoomId: "",
        senderId: "",
        recipientId: "",
        message: "",
        isRead: false,
        isDelivered: false,
        createdAt: "",
        isPosting: false,
      };
    },

    updateStartChatRecipient(
      state,
      action: PayloadAction<TStartChatRecipientPayload>
    ) {
      state.startChatRecipient = action.payload.startChatRecipient;
    },

    updateMessageList(state, action: PayloadAction<TMessageListPayload>) {
      state.messageList = action.payload.messageList;
    },
    showChat(state) {
      state.showChat = true;
    },
    hideChat(state) {
      state.showChat = false;
    },
    showChatRecipientList(state) {
      state.showChatRecipientList = true;
    },
    hideRecipientList(state) {
      state.showChatRecipientList = false;
    },
    clearChat(state) {
      state.chatRecipientList = [];
      state.currentRecipient = {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "patient",
        imageUrl: null,
        createdAt: "",
        updatedAt: "",
        messages: [],
      };
      state.messageList = [];
    },
  },
});