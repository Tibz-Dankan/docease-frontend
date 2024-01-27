import React, { Fragment } from "react";
import { AppDate } from "../../utils/appDate";
import { TAppointment } from "../../types/appointments";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { truncateString } from "../../utils/truncateString";
import { elapsedTime } from "../../utils/elapsedTime";
import { getAppointmentOverallStatus } from "../../utils/getAppointmentOverallStatus";
import { TUser } from "../../types/appointments";
import { FiEdit } from "react-icons/fi";
import {
  IoIosCloseCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { Modal } from "../../shared/UI/Modal";
import { DoctorRescheduleAppointment } from "./DoctorRescheduleAppointment";
import { DoctorApproveAppointment } from "./DoctorApproveAppointment";
import { DoctorCancelAppointment } from "./DoctorCancelAppointment";

interface CardProps {
  appointment: TAppointment;
}

export const DoctorDisplayAppointmentCard: React.FC<CardProps> = (props) => {
  const appointment = props.appointment;

  const weekday = new AppDate(appointment.startsAt).weekday();
  const dayMonthYear = new AppDate(appointment.startsAt).dayMonthYear();
  const appointmentDate = `${weekday}, ${dayMonthYear}`;

  const lastSeenAt = appointment.patient?.accessTokens[0].createdAt as string;
  const patient = appointment?.patient as TUser;

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

  const getStatusBgColor = (status: string): string => {
    if (status === "pending") return "bg-gray-300";
    if (status === "edited") return "bg-yellow-300";
    if (status === "approved") return "bg-blue-300";
    if (status === "done") return "bg-green-300";

    return "bg-gray-300";
  };

  return (
    <Fragment>
      <div
        className="w-full p-4 relative rounded-md shadow-md
        bg-white pt-10 space-y-2"
      >
        <div
          className={`${overallStatusColor} ${overallStatusBgColor}
           text-center absolute top-0 left-0 w-full rounded-t-md 
           uppercase text-sm p-2 font-semibold`}
        >
          {overallStatusTitle}
        </div>

        <div
          className="flex items-center justify-center text-sm
         text-gray-800"
        >
          <span className="mr-2">Status:</span>
          {appointment.statuses.map((status, index) => (
            <span
              key={index}
              className={`first-letter:uppercase ${getStatusBgColor(
                status.status
              )} text-[14px] rounded-xl px-2 mr-1`}
            >
              {status.status}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <div
            className="flex flex-col items-center justify-center
             gap-0 bg-gray-300 p-2 rounded text-sm text-primary"
          >
            <span className="font-semibold text-center">{appointmentDate}</span>
            <span className="">
              {getAppointmentElapseTime(appointment.startsAt)}
            </span>
          </div>
          <div
            className="flex items-center justify-center gap-4
            text-gray-800 text-sm"
          >
            <p className="flex flex-col justify-center gap-2">
              <span>Start</span>
              <span
                className="bg-gray-300 px-2 py-1 rounded
                 text-[14px] text-primary font-semibold"
              >
                {new AppDate(appointment.startsAt).time()}
              </span>
            </p>
            <p className="flex flex-col justify-center gap-2">
              <span>End</span>
              <span
                className="bg-gray-300 px-2 py-1 rounded
                 text-[14px] text-primary font-semibold"
              >
                {new AppDate(appointment.endsAt).time()}
              </span>
            </p>
          </div>
        </div>

        <div>
          <p
            className="flex items-start justify-start
            text-gray-600 py-2"
          >
            <span className="mr-2 font-thin">Subject:</span>
            <span className="text-gray-800 italics">
              {truncateString(appointment.subject)}
            </span>
          </p>
        </div>

        <div
          className="flex items-center justify-center gap-4
          border-[1px] border-gray-300 rounded-md p-4
          text-gray-800 relative"
        >
          <div className="absolute top-0 right-1">
            <span
              className="text-[12px] uppercase text-[#7048e8]
              font-semibold"
            >
              #{patient?.role}
            </span>
          </div>
          <div className="">
            {patient?.imageUrl && (
              <img
                src={patient?.imageUrl}
                alt={patient?.firstName}
                className="w-24 h-24 rounded-md"
              />
            )}
            {!patient?.imageUrl && (
              <span
                className="w-16 h-16 bg-gray-300 flex items-center
                justify-center rounded-[50%] shadow-sm"
              >
                <IconContext.Provider
                  value={{
                    size: "2rem",
                    color: "#868e96",
                  }}
                >
                  <IoPerson />
                </IconContext.Provider>
              </span>
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl">{`${patient.firstName} ${patient.lastName}`}</span>
            <span className="text-sm">
              Last seen: {`${elapsedTime(lastSeenAt)} ago`}
            </span>
          </div>
        </div>

        <div className="text-gray-800 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span>Made on</span>
            <span>{new AppDate(appointment.createdAt!).dayMonthYear()},</span>
            <span>{new AppDate(appointment.createdAt!).time()}</span>
          </p>
        </div>

        <div
          className="flex items-center justify-center gap-4
         text border-t-[1px] border-gray-300 pt-4 text-gray-700
         text-sm"
        >
          <Modal
            openModalElement={
              <p
                className="flex items-center justify-center gap-1
                cursor-pointer"
              >
                <span className="grid h-7 w-7 place-items-center">
                  <IconContext.Provider
                    value={{
                      size: "1rem",
                      color: "#5BC0DE",
                    }}
                  >
                    <IoMdCheckmarkCircleOutline />
                  </IconContext.Provider>
                </span>
                <span>Approve</span>
              </p>
            }
            className=""
          >
            <DoctorApproveAppointment appointment={appointment} />
          </Modal>
          <Modal
            openModalElement={
              <p
                className="flex items-center justify-center gap-1
                cursor-pointer"
              >
                <span className="grid h-7 w-7 place-items-center">
                  <IconContext.Provider
                    value={{
                      size: "1rem",
                      color: "#5BC0DE",
                    }}
                  >
                    <FiEdit />
                  </IconContext.Provider>
                </span>
                <span>Reschedule</span>
              </p>
            }
            className=""
          >
            <DoctorRescheduleAppointment appointment={appointment} />
          </Modal>
          <Modal
            openModalElement={
              <p
                className="flex items-center justify-center gap-1
                cursor-pointer"
              >
                <span className="w-auto h-auto">
                  <IconContext.Provider
                    value={{
                      size: "1rem",
                      color: "#D9534F",
                    }}
                  >
                    <IoIosCloseCircleOutline />
                  </IconContext.Provider>
                </span>
                <span>Cancel</span>
              </p>
            }
            className=""
          >
            <DoctorCancelAppointment appointment={appointment} />
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};