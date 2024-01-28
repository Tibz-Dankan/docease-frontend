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

export const updateAppointment = async ({
  appointmentId,
  patientId,
  doctorId,
  subject,
  startsAt,
  endsAt,
  token,
}: TPostAppointmentAuthorized) => {
  const response = await fetch(`${url}/appointments/update/${appointmentId}`, {
    method: "PATCH",
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

export const getAppointmentsByDoctor = async ({
  doctorId,
  token,
}: {
  doctorId: string;
  token: string;
}) => {
  const response = await fetch(
    `${url}/appointments/get-by-doctor?doctorId=${doctorId}`,
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

export const deleteAppointment = async ({
  appointmentId,
  token,
}: {
  appointmentId: string;
  token: string;
}) => {
  const response = await fetch(`${url}/appointments/delete/${appointmentId}`, {
    method: "DELETE",
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

export const rescheduleAppointment = async ({
  appointmentId,
  patientId,
  doctorId,
  subject,
  startsAt,
  endsAt,
  token,
}: TPostAppointmentAuthorized) => {
  const response = await fetch(
    `${url}/appointments/reschedule/${appointmentId}`,
    {
      method: "PATCH",
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
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

export const cancelAppointment = async ({
  appointmentId,
  doctorsComment,
  token,
}: {
  appointmentId: string;
  doctorsComment: string;
  token: string;
}) => {
  const response = await fetch(`${url}/appointments/cancel/${appointmentId}`, {
    method: "PATCH",
    body: JSON.stringify({
      doctorsComment,
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

export const approveAppointment = async ({
  appointmentId,
  token,
}: {
  appointmentId: string;
  token: string;
}) => {
  const response = await fetch(`${url}/appointments/approve/${appointmentId}`, {
    method: "PATCH",
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
