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

export const joinVideoConference = async ({
  peerId,
  videoConferenceId,
  accessToken,
}: {
  peerId: string;
  videoConferenceId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/conferences/join`, {
    method: "POST",
    body: JSON.stringify({
      peerId,
      videoConferenceId,
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
