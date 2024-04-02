import { url } from "../../store/index";

type TContactMessage = {
  name: string;
  email: string;
  message: string;
};

export const sendContactMessage = async ({
  name,
  email,
  message,
}: TContactMessage) => {
  const response = await fetch(`${url}/contact/send`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      message,
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

type TNewsLetter = {
  email: string;
};

export const subscribeToNewsLetter = async ({ email }: TNewsLetter) => {
  const response = await fetch(`${url}/newsletter/subscribe`, {
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
