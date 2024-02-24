import { url } from "../../store/index";
import { TMedicationExtended } from "../../types/medication";

interface UploadMedicalFile {
  formData: FormData;
  token: string;
}

export const uploadPatientMedicalFile = async ({
  formData,
  token,
}: UploadMedicalFile) => {
  const response = await fetch(`${url}/medical-records/post-file`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const getMedicalFilesByUser = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/medical-records/get-files-by-user/?userId=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const postMedicalRecord = async ({
  healthStatus,
  medication,
  illness,
  diet,
  userId,
  accessToken,
}: TMedicationExtended) => {
  const response = await fetch(`${url}/medical-records/post`, {
    method: "POST",
    body: JSON.stringify({
      healthStatus,
      medication,
      illness,
      diet,
      userId,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const getMedicalRecordByUser = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/medical-records/get-by-user/?userId=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const deleteMedicalFile = async ({
  medicalFileId,
  accessToken,
}: {
  medicalFileId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/medical-records/delete-file/${medicalFileId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};
