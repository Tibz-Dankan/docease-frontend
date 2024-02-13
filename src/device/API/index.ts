import { url } from "../../store";

export const postDeviceToken = async ({
  userId,
  deviceToken,
  platform,
  accessToken,
}: {
  userId: string;
  deviceToken: string;
  platform: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/notifications/post-device-token`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      deviceToken,
      platform,
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
