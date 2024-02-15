import { url } from "../../store";

export const postDevice = async ({
  userId,
  deviceToken,
  devicePlatform,
  accessToken,
}: {
  userId: string;
  deviceToken: string;
  devicePlatform: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/devices/post`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      deviceToken,
      devicePlatform,
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

export const getDevicesByUser = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/devices/get-by-user?userId=${userId}`, {
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

export const enableDevice = async ({
  deviceId,
  accessToken,
}: {
  deviceId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/devices/enable/${deviceId}`, {
    method: "PATCH",
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

export const disableDevice = async ({
  deviceId,
  accessToken,
}: {
  deviceId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/devices/disable/${deviceId}`, {
    method: "PATCH",
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
