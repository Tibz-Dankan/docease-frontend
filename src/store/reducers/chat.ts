import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IChatMessage,
  TChat,
  TCurrentRecipientPayload,
  TMarkMessagesAsRead,
  TMessageListPayload,
  TMessagePayload,
  TPostingMessagePayload,
  TRecipientListPayload,
  TRecipientMessageListPayload,
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

    // updating message coming from backend(recipient user)
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

    // updating messageList at start of list for messages coming from backend(recipient user)
    updateCurrentRecipientMessageWithList(
      state,
      action: PayloadAction<TRecipientMessageListPayload>
    ) {
      const recipient = state.currentRecipient;
      console.log("updating with list from backend ....");

      // const inComingLastMessage =
      //   action.payload.messages[action.payload.messages.length - 1];
      const inComingLastMessage = action.payload.messages[0];

      const message = recipient.messages.find(
        (message) => message.messageId === inComingLastMessage.messageId
      );
      if (message) return;

      recipient.messages = [...action.payload.messages, ...recipient.messages];
      state.currentRecipient = recipient;
    },

    // Adding message coming from current device user
    addToMessageList(state, action: PayloadAction<TMessagePayload>) {
      const recipient = state.currentRecipient;
      if (recipient.userId !== action.payload.message.recipientId) return;

      recipient.messages.push(action.payload.message);
      state.currentRecipient = recipient;
    },

    // Mark messages as read
    markMessagesAsRead(state, action: PayloadAction<TMarkMessagesAsRead>) {
      const recipientList = state.chatRecipientList;

      const recipient = recipientList.find((recipient) => {
        return recipient.userId === action.payload.senderId;
      });
      if (!recipient) return;

      const readMessages = [] as unknown as IChatMessage[];

      recipient.messages.map((message) => {
        const isRecipient: boolean =
          message.recipientId === action.payload.recipientId;

        const isRead: boolean = message.isRead;
        const isMessageMarkableAsRead: boolean = isRecipient && !isRead;

        if (isMessageMarkableAsRead) {
          message.isRead = true;
          readMessages.push(message);
          return;
        }
        readMessages.push(message);
      });

      recipient.messages = readMessages;

      if (recipientList.length === 1) {
        state.chatRecipientList = [recipient];
        return;
      }

      const recipientIndex: number = recipientList.findIndex((recipient) => {
        return recipient.userId === action.payload.senderId;
      });
      recipientList[recipientIndex] = recipient;
      state.chatRecipientList = recipientList;
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
