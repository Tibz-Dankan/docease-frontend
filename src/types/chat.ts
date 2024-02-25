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

export type TChat = {
  chatRecipientList: TUser[];
  currentRecipient: TUser;
  messageList: IChatMessage[];
  showChat: boolean;
  showChatRecipientList: boolean;
};

export type TChatState = {
  chat: TChat;
};

export type TRecipientListPayload = {
  chatRecipientList: TUser[];
};

export type TCurrentRecipientPayload = {
  currentRecipient: TUser;
};

export type TMessageListPayload = {
  messageList: IChatMessage[];
};

export type TMessagePayload = {
  message: IChatMessage;
};
