import React, { Fragment } from "react";
import { StatsCard } from "../../shared/UI/StatsCard";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { IoPerson } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useQuery } from "@tanstack/react-query";
import { getDoctorStatistics } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TDoctorStatistics } from "../../types/dashboard";
import { Image } from "../../shared/UI/Image";
import Calendar from "react-calendar";
import { getAppointmentOverallStatus } from "../../utils/getAppointmentOverallStatus";
import { AppDate } from "../../utils/appDate";
import { TAppointment } from "../../types/appointments";
import { AppointmentStatusKey } from "../../appointment/UI/AppointmentStatusKey";
import { DashboardLoader } from "../../patient/UI/DashboardLoader";
import { UserOnlineStatus } from "../../onlineStatus/UI/UserOnlineStatus";

interface TileContentProps {
  date: any;
  view?: any;
}

export const DoctorDashboard: React.FC = () => {
  const user = useSelector((state: TAuthState) => state.auth.user);

  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { isLoading, data } = useQuery({
    queryKey: [`patient-stats-${user?.userId}`],
    queryFn: () =>
      getDoctorStatistics({
        doctorId: user?.userId!,
        accessToken: accessToken,
      }),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) return <DashboardLoader />;

  const doctorStats = data?.data.statistics as TDoctorStatistics;
  const upcomingAppointments = doctorStats?.upcomingAppointments;

  const isLastElementOfList = (list: any[], index: number) => {
    return list.length - 1 === index;
  };

  const tileContent = ({ date }: TileContentProps) => {
    for (let i = 0; i < upcomingAppointments.length; i++) {
      const appointmentDate = new Date(upcomingAppointments[i].startsAt);

      const overallStatus = getAppointmentOverallStatus(
        upcomingAppointments[i]
      );
      const borderColor = overallStatus.borderColor;

      if (date.toDateString() === appointmentDate.toDateString()) {
        return (
          <div
            className={`absolute top-0 left-0 mx-auto h-full
              w-full border-[2px] ${borderColor}`}
          ></div>
        );
      }
    }

    return null;
  };

  // Appointment overall status
  const appointmentOV = (appointment: TAppointment) => {
    return getAppointmentOverallStatus(appointment);
  };

  return (
    <Fragment>
      <div className="w-full">
        <div
          className="flex flex-col items-start justify-center 
           sm:flex-row sm:justify-start gap-5"
        >
          <div className="w-full space-y-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatsCard
                title={"My Patients"}
                count={doctorStats.myPatientCount}
                link={"/doctor/my-patients"}
                countClassName={"text-[#2f9e44]"}
                iconColor={"#2f9e44"}
                className="border-2 border-[#2f9e44] rounded-lg"
              />
              <StatsCard
                title={"New Patients"}
                count={doctorStats.newPatientCount}
                link={"/doctor/my-patients"}
                countClassName={"text-[#2f9e44]"}
                iconColor={"#2f9e44"}
                className="border-2 border-[#2f9e44] rounded-lg"
              />
              <StatsCard
                title={"Unread Messages"}
                count={doctorStats.unReadMessageCount}
                link={"/doctor/my-patients"} // should trigger opening of the chat window
                countClassName={"text-[#2f9e44]"}
                iconColor={"#2f9e44"}
                className="border-2 border-[#2f9e44] rounded-lg"
              />
              <StatsCard
                title={"Unread Notifications"}
                count={doctorStats.unReadNotificationCount}
                link={"/doctor/notifications"}
                countClassName={"text-[#2f9e44]"}
                iconColor={"#2f9e44"}
                className="border-2 border-[#2f9e44] rounded-lg"
              />
            </div>
            {/* Recent patients here */}
            <div
              className="w-full text-gray-800 bg-gray-50 
               rounded-md shadow-md p-4"
            >
              <div className="border-b-[1px] border-gray-300 pb-2 mb-4">
                <span className="text-gray-600 text-sms text-center w-full">
                  Patients you have previously interacted with
                </span>
              </div>
              {doctorStats.recentPatients.map((patient, index) => (
                <div
                  className={`flex items-center justify-start gap-3
                  ${
                    !isLastElementOfList(doctorStats.recentPatients, index) &&
                    "border-b-[1px] border-b-gray-400 pb-4"
                  }`}
                  key={index}
                >
                  <div className="w-10 h-10 relative">
                    {patient.Patient.imageUrl && (
                      <span>
                        <Image
                          src={patient.Patient.imageUrl!}
                          alt={`${patient.Patient.firstName}`}
                          className="w-full h-full rounded-[50%]"
                        />
                      </span>
                    )}
                    {!patient.Patient.imageUrl && (
                      <span
                        className="cursor-pointer grid place-items-center
                       bg-gray-300 p-1 w-full h-full rounded-[50%]"
                      >
                        <IconContext.Provider
                          value={{ size: "1.1rem", color: "#495057" }}
                        >
                          <IoPerson />
                        </IconContext.Provider>
                      </span>
                    )}
                    <div className="absolute -right-[6px] bottom-1 inline-block">
                      <UserOnlineStatus
                        userId={patient.Patient.userId}
                        updatedAt={patient.Patient?.onlineStatus?.updatedAt}
                      />
                    </div>
                  </div>
                  <span>
                    {patient.Patient.firstName} {patient.Patient.lastName}
                  </span>
                  <span className="first-letter:uppercase">
                    {patient.Patient.gender}
                  </span>
                  {/* TODO:start chat action, here*/}
                  {/* TODO:start video conf action, here */}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="w-full space-y-6">
              <Calendar
                className="w-full border-nones bg-gray-300 px-0 text-lg
                rounded-lg h-[300] border-2 border-gray-500"
                tileContent={tileContent}
                tileClassName="relative"
              />
              <div className="bg-gray-50 p-4 rounded-md shadow-md">
                <div className="border-b-[1px] border-gray-300 pb-2 mb-4">
                  <p
                    className="text-blue-600  text-center w-full
                    font-semibold"
                  >
                    Upcoming Appointments
                  </p>
                </div>
                {upcomingAppointments.map((appointment, index) => (
                  <div
                    className={`flex items-center justify-start gap-3
                  ${
                    !isLastElementOfList(upcomingAppointments, index) &&
                    "border-b-[1px] border-b-gray-400 pb-4 mb-4"
                  } text-gray-800 text-sm`}
                    key={index}
                  >
                    <div className="w-8 h-8 relative">
                      {appointment.patient?.imageUrl && (
                        <span>
                          <Image
                            src={appointment.patient?.imageUrl!}
                            alt={`${appointment.patient?.firstName}`}
                            className="w-full h-full rounded-[50%]"
                          />
                        </span>
                      )}
                      {!appointment.patient?.imageUrl && (
                        <span
                          className="cursor-pointer grid place-items-center
                       bg-gray-300 p-1 w-full h-full rounded-[50%]"
                        >
                          <IconContext.Provider
                            value={{ size: "1rem", color: "#495057" }}
                          >
                            <IoPerson />
                          </IconContext.Provider>
                        </span>
                      )}
                      <div className="absolute -right-[6px] bottom-0 inline-block">
                        <UserOnlineStatus
                          userId={appointment.patientId}
                          updatedAt={
                            appointment.patient?.onlineStatus?.updatedAt!
                          }
                        />
                      </div>
                    </div>
                    <span>
                      {appointment.patient?.firstName}{" "}
                      {appointment.patient?.lastName}
                    </span>
                    <span className="hidden sm:block first-letter:uppercase">
                      {appointment.patient?.role}
                    </span>
                    <span className="">
                      {new AppDate(appointment.startsAt).monthDayYear()}
                    </span>
                    <span
                      className={`first-letter:uppercase text-center
                    text-[12px]  ${appointmentOV(appointment).bgColor}
                    ${appointmentOV(appointment).color} px-2 rounded-2xl
                    py-1 hidden sm:block`}
                    >
                      {appointmentOV(appointment).overallStatus}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <AppointmentStatusKey />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
