import { url } from "../../store/index";
import { TSigninInPut, TSignupInput } from "../../types/auth";
import { getDeviceInfo } from "../../utils/getDeviceInfo";

export const signIn = async ({ email, password }: TSigninInPut) => {
  const platform = getDeviceInfo().platform;
  const browser = getDeviceInfo().browser;
  const browserVersion = getDeviceInfo().browserVersion;

  const response = await fetch(`${url}/users/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      platform,
      browser,
      browserVersion,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const signInDoctor = async ({ email, password }: TSigninInPut) => {
  const platform = getDeviceInfo().platform;
  const browser = getDeviceInfo().browser;
  const browserVersion = getDeviceInfo().browserVersion;

  const response = await fetch(`${url}/users/doctor/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      platform,
      browser,
      browserVersion,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const signInPatient = async ({ email, password }: TSigninInPut) => {
  const platform = getDeviceInfo().platform;
  const browser = getDeviceInfo().browser;
  const browserVersion = getDeviceInfo().browserVersion;

  const response = await fetch(`${url}/users/patient/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      platform,
      browser,
      browserVersion,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const signUpPatient = async ({
  firstName,
  lastName,
  email,
  gender,
  phoneNumber,
  password,
}: TSignupInput) => {
  const response = await fetch(`${url}/users/patients/signup`, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const signUpDoctor = async ({
  firstName,
  lastName,
  email,
  gender,
  phoneNumber,
  password,
}: TSignupInput) => {
  const response = await fetch(`${url}/users/doctors/signup`, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const forgotPassword = async ({ email }: { email: string }) => {
  const response = await fetch(`${url}/users/forgot-password`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const resetPassword = async ({
  newPassword,
  resetToken,
}: {
  newPassword: string;
  resetToken: string;
}) => {
  const response = await fetch(`${url}/users/reset-password/${resetToken}`, {
    method: "PATCH",
    body: JSON.stringify({
      password: newPassword,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const updateProfile = async (
  firstName: string,
  lastName: string,
  email: string,
  userId: string,
  accessToken: string
) => {
  const response = await fetch(`${url}/users/edit-user-details/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
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

export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
  userId: string,
  accessToken: string
) => {
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

export const updateUserImage = async (
  formData: FormData,
  accessToken: string,
  userId: string
) => {
  const response = await fetch(`${url}/users/update-user-image/${userId}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const getUserData = async (accessToken: string, userId: string) => {
  const response = await fetch(`${url}/users/get-user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const enableTwoFA = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const platform = getDeviceInfo().platform;
  const browser = getDeviceInfo().browser;
  const browserVersion = getDeviceInfo().browserVersion;

  const response = await fetch(`${url}/2fa/enable`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      platform,
      browser,
      browserVersion,
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

export const disableTwoFA = async ({
  twofaId,
  accessToken,
}: {
  twofaId: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/2fa/disable/${twofaId}`, {
    method: "PATCH",
    body: JSON.stringify({}),
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

export const resendEnableTwoFA = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const platform = getDeviceInfo().platform;
  const browser = getDeviceInfo().browser;
  const browserVersion = getDeviceInfo().browserVersion;

  const response = await fetch(`${url}/2fa/resend-enable`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      platform,
      browser,
      browserVersion,
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

export const confirmTwoFA = async ({
  token,
  accessToken,
}: {
  token: string;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/2fa/confirm`, {
    method: "PATCH",
    body: JSON.stringify({
      token,
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

export const verifyTwoFAToken = async ({
  twoFAToken,
}: {
  twoFAToken: string;
}) => {
  const platform = getDeviceInfo().platform;
  const browser = getDeviceInfo().browser;
  const browserVersion = getDeviceInfo().browserVersion;

  const response = await fetch(`${url}/2fa/verify`, {
    method: "POST",
    body: JSON.stringify({
      token: twoFAToken,
      platform,
      browser,
      browserVersion,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const getSessionDevicesByUser = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/session-devices/get-by-user?userId=${userId}`,
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

export const deleteSessionDevice = async ({
  sessionDeviceId,
  accessToken,
}: {
  sessionDeviceId: string;
  accessToken: string;
}) => {
  const response = await fetch(
    `${url}/session-devices/delete/${sessionDeviceId}`,
    {
      method: "DELETE",
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
