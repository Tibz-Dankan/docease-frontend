import { TAppointment } from "./appointments";
import { TUser } from "./auth";

type TOnlineStatus = {
  updatedAt: string;
};

type TUserExtended = TUser & {
  onlineStatus: TOnlineStatus;
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
  medicalFileCount: number;
  mentalHealthAssessmentCount: number;
  unReadNotificationCount: number;
  unReadMessageCount: number;
  recentDoctors: RecentDoctor[];
  upcomingAppointments: TAppointment[];
};
