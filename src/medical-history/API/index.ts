import { url } from "../../store/index";

interface UploadMedicalFile {
  formData: FormData;
  token: string;
}

export const uploadPatientMedicalFile = async ({
  formData,
  token,
}: UploadMedicalFile) => {
  const response = await fetch(`${url}/medical-records/post`, {
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
