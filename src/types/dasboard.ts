import { TAppointment } from "./appointments";
import { TUser } from "./auth";

type AccessToken = {
  createdAt: string;
};

type TUserExtended = TUser & {
  accessToken: AccessToken;
};

type RecentPatient = {
  Patient: TUserExtended;
};
type RecentDoctor = {
    Doctor: TUserExtended;
};

export type TDoctorStatistics = {
  myPatientCount: number;
  newPatientCount: number;
  unReadNotificationCount: number;
  unReadMessageCount: number;
  recentPatients: RecentPatient[];
  upcomingAppointments: TAppointment[];
};

export type TPatientStatistics = {
  unReadNotificationCount: number;
  unReadMessageCount: number;
  recentDoctors: RecentDoctor[];
  upcomingAppointments: TAppointment[];
};
