import { url } from "../../store";
import { IChatMessage } from "../../types/chat";

export const getChatRecipients = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/chat/get-chat-recipients?userId=${userId}`,
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

interface IChatMessageExtended extends IChatMessage {
  accessToken?: string;
}

export const postChat = async (message: IChatMessageExtended) => {
  const accessToken = message.accessToken;
  delete message["accessToken"];

  const response = await fetch(`${url}/chat/post`, {
    method: "POST",
    body: JSON.stringify(message),
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

export const getMessagesByChatRoom = async ({
  chatRoomId: chatRoomId,
  cursorId: cursorId,
  accessToken: accessToken,
}: {
  chatRoomId: string;
  cursorId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/chat/get-messages?chatRoomId=${chatRoomId}&cursorId=${cursorId}`,
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

export const getChatRecipientByRole = async (
  accessToken: string,
  role: string
) => {
  const response = await fetch(`${url}/users/get-user-by-role?role=${role}`, {
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

export const markMessagesAsRead = async ({
  userId: userId,
  createdAt: createdAt,
  accessToken: accessToken,
}: {
  userId: string;
  createdAt: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/chat/mark-message-as-read`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: userId,
      createdAt: createdAt,
    }),
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
