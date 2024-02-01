import { url } from "../../store/index";

type TUpdateUser = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  accessToken: string;
};

export const updateProfile = async ({
  userId,
  firstName,
  lastName,
  gender,
  email,
  phoneNumber,
  accessToken,
}: TUpdateUser) => {
  const response = await fetch(`${url}/users/edit-user-details/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      firstName,
      lastName,
      gender,
      email,
      phoneNumber,
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

interface PasswordUpdate {
  userId: string;
  currentPassword: string;
  newPassword: string;
  accessToken: string;
}

export const updatePassword = async ({
  userId,
  currentPassword,
  newPassword,
  accessToken,
}: PasswordUpdate) => {
  const response = await fetch(`${url}/users/change-password/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      currentPassword,
      newPassword,
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

interface FormDataWithToken {
  userId: string;
  formData: FormData;
  token: string;
}

export const updateProfileImage = async ({
  userId,
  formData,
  token,
}: FormDataWithToken) => {
  const response = await fetch(`${url}/users/update-user-image/${userId}`, {
    method: "PATCH",
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
