import { url } from "../../store";

export const updateOnlineStatus = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/status/update`, {
    method: "PATCH",
    body: JSON.stringify({
      userId,
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
