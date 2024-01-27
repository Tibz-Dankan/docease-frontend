import React, { Fragment } from "react";
import { AppDate } from "../../utils/appDate";
import { TAppointment } from "../../types/appointments";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { truncateString } from "../../utils/truncateString";
import { elapsedTime } from "../../utils/elapsedTime";
import { getAppointmentOverallStatus } from "../../utils/getAppointmentOverallStatus";
import { TUser } from "../../types/appointments";

interface CardProps {
  appointment: TAppointment;
}

export const DisplayAppointmentCard: React.FC<CardProps> = (props) => {
  const appointment = props.appointment;

  // TODO: to dynamically change the color of the overallStatus depending the status
  // TODO: to dynamically change bg color of the status

  const weekday = new AppDate(appointment.startsAt).weekday();
  const dayMonthYear = new AppDate(appointment.startsAt).dayMonthYear();
  const appointmentDate = `${weekday}, ${dayMonthYear}`;

  const lastSeenAt = appointment.doctor?.accessTokens[0].createdAt as string;
  const doctor = appointment?.doctor as TUser;

  const overallStatus = getAppointmentOverallStatus(appointment);
  const overallStatusTitle = overallStatus.overallStatus;
  const overallStatusBgColor = overallStatus.bgColor;
  const overallStatusColor = overallStatus.color;

  const getAppointmentElapseTime = (dateStr: string): string => {
    const elapseTime = elapsedTime(dateStr) as string;

    if (elapseTime.startsWith("-")) {
      return `In ${elapseTime.slice(1)}`;
    }
    return `${elapseTime} past`;
  };

  //   bg-[#868e96]s

  return (
    <Fragment>
      <div className="w-full p-4 relative rounded-md shadow-md bg-white pt-10">
        <div
          className={`${overallStatusColor} ${overallStatusBgColor}
           text-center absolute top-0 left-0 w-full rounded-t-md 
           uppercase text-sm p-2`}
        >
          {overallStatusTitle}
        </div>

        <div className="flex items-center justify-center">
          <span className="mr-2">Status:</span>
          {appointment.statuses.map((status, index) => (
            <span key={index} className="first-letter:uppercase">
              {status.status}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <span>{appointmentDate}</span>
            <span>{getAppointmentElapseTime(appointment.startsAt)}</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className="flex flex-col justify-center gap-2">
              <span>Start Time</span>
              <span>{new AppDate(appointment.startsAt).time()}</span>
            </p>
            <p className="flex flex-col justify-center gap-2">
              <span>End Time</span>
              <span>{new AppDate(appointment.endsAt).time()}</span>
            </p>
          </div>
        </div>

        <div>
          <p className="flex items-start justify-start">
            <span className="mr-4">Subject:</span>
            <span>{truncateString(appointment.subject)}</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div>
            {appointment.doctor?.imageUrl && (
              <img
                src={appointment.doctor?.imageUrl}
                alt={appointment.doctor?.firstName}
              />
            )}
            {!appointment.doctor?.imageUrl && (
              <span
                className="w-24 h-24 bg-gray-500 flex items-center
                justify-center rounded-md shadow"
              >
                <IconContext.Provider
                  value={{
                    size: "3.4rem",
                    color: "#f1f3f5",
                  }}
                >
                  <IoPerson />
                </IconContext.Provider>
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</span>
            <span>Last seen: {`${elapsedTime(lastSeenAt)} ago`}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span>Edit</span>
          <span>Delete</span>
        </div>
      </div>
    </Fragment>
  );
};
