import { url } from "../../store";

export const getVideoConference = async ({
  hostId,
  attendeeId,
  accessToken,
}: {
  hostId: string;
  attendeeId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/conferences/get?hostId=${hostId}&attendeeId=${attendeeId}`,
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
