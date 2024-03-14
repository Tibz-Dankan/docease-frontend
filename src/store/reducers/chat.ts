import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TChat,
  TCurrentRecipientPayload,
  TMessageListPayload,
  TMessagePayload,
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
    updateCurrentRecipientMessage(
      state,
      action: PayloadAction<TRecipientMessagePayload>
    ) {
      const recipient = state.currentRecipient;
      if (recipient.userId !== action.payload.message.senderId) return;

      recipient.messages.push(action.payload.message);
      state.currentRecipient = recipient;
    },
    updateMessageList(state, action: PayloadAction<TMessageListPayload>) {
      state.messageList = action.payload.messageList;
    },
    addToMessageList(state, action: PayloadAction<TMessagePayload>) {
      state.messageList = [...state.messageList, action.payload.message];
    },
    clearMessageList(state) {
      state.messageList = [];
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
