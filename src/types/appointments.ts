export type TPostAppointment = {
  patientId: string;
  doctorId: string;
  subject: string;
  startsAt: string;
  endsAt: string;
};

export type TPostAppointmentAuthorized = TPostAppointment & {
  token: string;
};
