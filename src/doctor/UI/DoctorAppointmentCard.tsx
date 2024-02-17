import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { Button } from "../../shared/UI/Button";
import { Modal } from "../../shared/UI/Modal";
import { PostAppointment } from "../../appointment/UI/PostAppointment";
import { elapsedTime } from "../../utils/elapsedTime";
import { GetVideoConference } from "../../video-conference/UI/GetVideoConference";

interface CardProps {
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string;
}

export const DoctorAppointmentCard: React.FC<CardProps> = (props) => {
  const doctorName = `${props.firstName} ${props.lastName}`;
  const doctorId = props.userId;

  const lastSeenAt = props.lastSeenAt as string;

  return (
    <Fragment>
      <div
        className="space-y-4 shadow p-4 rounded-md bg-white
        relative"
      >
        <div
          className="flex items-center justify-center gap-4
          border-[1px] border-gray-300 rounded-md p-4
          text-gray-800 relative"
        >
          <div className="absolute top-0 right-1">
            <span
              className="text-[12px] uppercase text-[#1098ad]
              font-semibold"
            >
              #{props?.role}
            </span>
          </div>
          <div className="">
            {props?.imageUrl && (
              <img
                src={props?.imageUrl}
                alt={props?.firstName}
                className="w-24 h-24 rounded-md"
              />
            )}
            {!props?.imageUrl && (
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
            <span className="text-xl">{`Dr. ${doctorName}`}</span>
            <span className="text-sm">
              Last seen: {`${elapsedTime(lastSeenAt)} ago`}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <GetVideoConference attendeeId={doctorId} />
          </div>
          <Modal
            openModalElement={
              <Button
                label="Make Appointment"
                type="button"
                className="w-full text-sm"
              />
            }
            className=""
          >
            <div>
              <PostAppointment doctorName={doctorName} doctorId={doctorId} />
            </div>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};
