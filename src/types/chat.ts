import { TUser } from "./auth";

export type TFile = {
  url: string;
  path: string;
  type: string;
};

export type TChatFile = {
  fileId: string;
  messageId: string;
  file: TFile;
  createdAt: Date;
  updatedAt: Date;
};
export interface IChatMessage {
  messageId?: string;
  chatRoomId: string;
  senderId: string;
  recipientId: string;
  message: string;
  isRead: boolean;
  isDelivered: boolean;
  createdAt: string;
}

export interface IOrganizedChatMessage extends IChatMessage {
  isPrimaryMessage: boolean;
  currentUserIsSender: boolean;
  showDay: boolean;
  showTime: boolean;
  userImageUrl: string | null;
  username: string;
}

export type TChatRecipient = TUser & {
  messages: IChatMessage[];
};

export interface IPostingMessage extends IChatMessage {
  isPosting: boolean;
}

export type TChat = {
  chatRecipientList: TChatRecipient[];
  currentRecipient: TChatRecipient;
  startChatRecipient: TChatRecipient;
  postMessaging: IPostingMessage;
  messageList: IChatMessage[];
  showChat: boolean;
  showChatRecipientList: boolean;
};

export type TChatState = {
  chat: TChat;
};

export type TRecipientListPayload = {
  chatRecipientList: TChatRecipient[];
};

export type TCurrentRecipientPayload = {
  currentRecipient: TChatRecipient;
};

export type TStartChatRecipientPayload = {
  startChatRecipient: TChatRecipient;
};

export type TRecipientMessagePayload = {
  message: IChatMessage;
};

export type TRecipientMessageListPayload = {
  messages: IChatMessage[];
};
export type TPostingMessagePayload = {
  postMessaging: IPostingMessage;
};

export type TMessageListPayload = {
  messageList: IChatMessage[];
};

export type TMessagePayload = {
  message: IChatMessage;
};

export type TMarkMessagesAsRead = {
  recipientId: string;
  senderId: string;
};
