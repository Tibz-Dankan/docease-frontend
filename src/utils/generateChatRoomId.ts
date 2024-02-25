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

// // Example usage:
// const user1: TUser = {
//   userId: "user123",
//   firstName: "John",
//   lastName: "Doe",
//   email: "john@example.com",
//   phoneNumber: "1234567890",
//   role: "patient",
//   imageUrl: null,
//   createdAt: "2024-02-24",
//   updatedAt: "2024-02-24",
// };

// const user2: TUser = {
//   userId: "user456",
//   firstName: "Jane",
//   lastName: "Doe",
//   email: "jane@example.com",
//   phoneNumber: "9876543210",
//   role: "doctor",
//   imageUrl: null,
//   createdAt: "2024-02-25",
//   updatedAt: "2024-02-25",
// };

// const chatRoomId = generateChatRoomId(user1, user2);
// console.log(chatRoomId); // Output: user123-a-user456
