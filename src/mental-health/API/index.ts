import { url } from "../../store/index";

export const postAssessment = async ({
  userId,
  answeredQuestions,
  token,
}: {
  userId: string;
  answeredQuestions: string;
  token: string;
}) => {
  const response = await fetch(`${url}/mental-health/post`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      answeredQuestions,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const getMentalAssessment = async ({
  mentalHealthId,
  token,
}: {
  mentalHealthId: string;
  token: string;
}) => {
  const response = await fetch(`${url}/mental-health/get/${mentalHealthId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const getMentalAssessmentByUser = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const response = await fetch(
    `${url}/mental-health/get-by-user?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};
