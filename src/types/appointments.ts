export type TPostAppointment = {
  appointmentId?: string;
  patientId: string;
  doctorId: string;
  subject: string;
  startsAt: string;
  endsAt: string;
};

export type TPostAppointmentAuthorized = TPostAppointment & {
  token: string;
};
type TOnlineStatus = {
  updatedAt: string;
};

export type TUser = {
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  imageUrl: string;
  onlineStatus: TOnlineStatus;
};

export type TAppointmentStatus = {
  status: string;
};

export type TAppointment = {
  appointmentId: string;
  patient?: TUser;
  patientId: string;
  doctor?: TUser;
  doctorId: string;
  subject: string;
  startsAt: string;
  endsAt: string;
  doctorsComment?: string;
  patientsComment?: string;
  createdAt?: string;
  updatedAt?: string;
  overallStatus: string;
  statuses: TAppointmentStatus[];
};

export type TAppointmentOverallStatus = {
  overallStatus: string;
  bgColor: string;
  color: string;
  borderColor?: string;
};
