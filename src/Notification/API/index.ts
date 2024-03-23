import { url } from "../../store";

export const getNotificationsByUser = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/notifications/get-by-user?userId=${userId}`,
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

export const markNotificationAsRead = async ({
  notificationId,
  accessToken,
}: {
  notificationId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/notifications/mark-as-read/${notificationId}`,
    {
      method: "PATCH",
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
