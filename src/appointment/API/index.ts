import { url } from "../../store/index";
import { TPostAppointmentAuthorized } from "../../types/appointments";

export const postAppointment = async ({
  patientId,
  doctorId,
  subject,
  startsAt,
  endsAt,
  token,
}: TPostAppointmentAuthorized) => {
  const response = await fetch(`${url}/appointments/post`, {
    method: "POST",
    body: JSON.stringify({
      patientId,
      doctorId,
      subject,
      startsAt,
      endsAt,
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

export const getAppointmentsByPatient = async ({
  patientId,
  token,
}: {
  patientId: string;
  token: string;
}) => {
  const response = await fetch(
    `${url}/appointments/get-by-patient?patientId=${patientId}`,
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