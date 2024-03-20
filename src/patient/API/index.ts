import { url } from "../../store";

export const getPatientStatistics = async ({
  patientId,
  accessToken,
}: {
  patientId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/users/get-stats-by-patient/${patientId}`,
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
