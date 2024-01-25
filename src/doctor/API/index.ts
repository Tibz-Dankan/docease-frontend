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
