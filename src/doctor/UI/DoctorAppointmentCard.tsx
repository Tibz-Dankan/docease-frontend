import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { PostAppointment } from "../../appointment/UI/PostAppointment";
import { StartChat } from "../../chat/UI/StartChat";
import { TChatRecipient } from "../../types/chat";
import { UserOnlineStatus } from "../../onlineStatus/UI/UserOnlineStatus";
import { Image } from "../../shared/UI/Image";
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

  const startChatRecipient: TChatRecipient = {
    userId: props.userId,
    firstName: props.firstName,
    lastName: props.lastName,
    email: "",
    phoneNumber: "",
    role: "doctor",
    imageUrl: props.imageUrl,
    createdAt: props.createdAt,
    updatedAt: props.updatedAt,
    messages: [],
  };

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
          <div className="w-16 h-16">
            {props?.imageUrl && (
              <Image
                src={props?.imageUrl}
                alt={props?.firstName}
                className="w-full h-full rounded-[50%]"
              />
            )}
            {!props?.imageUrl && (
              <span
                className="w-full h-full bg-gray-300 flex items-center
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
            <UserOnlineStatus
              userId={doctorId}
              updatedAt={lastSeenAt}
              showDetailedStatus={true}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="w-full flex justify-center items-center gap-2">
            <GetVideoConference attendeeId={doctorId} />
            <StartChat startChatRecipient={startChatRecipient} />
          </div>
          <PostAppointment doctorName={doctorName} doctorId={doctorId} />
        </div>
      </div>
    </Fragment>
  );
};
