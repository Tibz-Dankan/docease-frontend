import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { Button } from "../../shared/UI/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
// import { GetVideoConference } from "../../video-conference/UI/GetVideoConference";
import { Image } from "../../shared/UI/Image";
import { UserOnlineStatus } from "../../onlineStatus/UI/UserOnlineStatus";

interface CardProps {
  patientId: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string;
}

export const PatientProfileCard: React.FC<CardProps> = (props) => {
  const patientName = `${props.firstName} ${props.lastName}`;
  const patientId = props.patientId;
  const lastSeenAt = props.lastSeenAt as string;

  const userRole = useSelector((state: TAuthState) => state.auth.user?.role!);

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
            <span className="text-xl">{`${patientName}`}</span>
            <UserOnlineStatus
              userId={patientId}
              updatedAt={lastSeenAt}
              showDetailedStatus={true}
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* <div className="flex justify-center">
            <GetVideoConference attendeeId={doctorId} />
          </div> */}
          <div className="w-full h-auto border-[1px] border-gray-800 rounded">
            <Link
              to={`/${userRole}/my-patients/patient-medical-history/${patientId}`}
            >
              <Button
                label="View Medical History"
                type="button"
                className="bg-white text-gray-800"
              />
            </Link>
          </div>
          <div className="w-full h-auto border-[1px] border-gray-800 rounded">
            <Link
              to={`/${userRole}/my-patients/patient-health-assessment/${patientId}`}
            >
              <Button
                label="Mental Health Assessment"
                type="button"
                className="bg-white text-gray-800"
              />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
