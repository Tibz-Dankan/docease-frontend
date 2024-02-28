import { TUser } from "../types/auth";

export const generateChatRoomId = (
  currentUser: TUser,
  recipient: TUser
): string => {
  const smallerUserId =
    currentUser.createdAt < recipient.createdAt
      ? currentUser.userId
      : recipient.userId;

  const largerUserId =
    currentUser.createdAt < recipient.createdAt
      ? recipient.userId
      : currentUser.userId;
  const chatRoomId = `${smallerUserId}-a-${largerUserId}`;
  return chatRoomId;
};
