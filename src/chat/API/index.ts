import { url } from "../../store";

export const getChatRecipients = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/chat/get-chat-recipients/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const getChatMessages = async ({
  chatRoomId: chatRoomId,
  accessToken: accessToken,
}: {
  chatRoomId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/chat/get-chat-messages?chatRoomId=${chatRoomId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
