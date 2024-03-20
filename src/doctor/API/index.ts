import { url } from "../../store/index";

export const getAllDoctors = async (token: string) => {
  const response = await fetch(`${url}/users/get-user-by-role?role=doctor`, {
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

export const getDoctorsPatients = async ({
  doctorId,
  accessToken,
}: {
  doctorId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/doctors-patient/get-by-doctor?doctorId=${doctorId}`,
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

export const getDoctorStatistics = async ({
  doctorId,
  accessToken,
}: {
  doctorId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/users/get-stats-by-doctor/${doctorId}`, {
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
