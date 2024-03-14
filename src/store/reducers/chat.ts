import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TChat,
  TCurrentRecipientPayload,
  TMessageListPayload,
  TMessagePayload,
  TPostingMessagePayload,
  TRecipientListPayload,
  TRecipientMessagePayload,
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
    updateChatRecipientListMessage(
      state,
      action: PayloadAction<TRecipientMessagePayload>
    ) {
      const recipientList = state.chatRecipientList;

      const recipient = recipientList.find((recipient) => {
        return recipient.userId === action.payload.message.senderId;
      });
      if (!recipient) return;
      recipient.messages.push(action.payload.message);

      const recipientIndex = recipientList.findIndex(
        (recipient) => recipient.userId === action.payload.message.senderId
      );

      recipientList.splice(recipientIndex, 1); //Remove element from recipientList
      recipientList.unshift(recipient); //Add element at beginning of recipientList
      state.chatRecipientList = recipientList;
    },
    updateCurrentRecipient(
      state,
      action: PayloadAction<TCurrentRecipientPayload>
    ) {
      state.currentRecipient = action.payload.currentRecipient;
    },

    // updating messages from coming from backend(recipient user)
    updateCurrentRecipientMessage(
      state,
      action: PayloadAction<TRecipientMessagePayload>
    ) {
      const recipient = state.currentRecipient;
      if (recipient.userId !== action.payload.message.senderId) return;

      recipient.messages.push(action.payload.message);
      state.currentRecipient = recipient;
    },

    // Adding messages from coming from device user
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
