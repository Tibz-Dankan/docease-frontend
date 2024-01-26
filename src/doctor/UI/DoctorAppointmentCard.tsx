import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { Button } from "../../shared/UI/Button";
import { FaStethoscope } from "react-icons/fa";
import { Modal } from "../../shared/UI/Modal";
import { AppDate } from "../../utils/appDate";
import { PostAppointment } from "../../appointment/UI/PostAppointment";

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
  const lastSeenAtDate = new AppDate(props.lastSeenAt).dayMonthYear();
  const lastSeenAtTime = new AppDate(props.lastSeenAt).time();
  const doctorName = `${props.firstName} ${props.lastName}`;
  const doctorId = props.userId;

  return (
    <Fragment>
      <div
        className="space-y-4 shadow p-4 rounded-md bg-white
        relative"
      >
        <div
          className="bg-[#748ffc] h-4 w-full absolute top-0 left-0 
          rounded-t-md flex items-center justify-center"
        >
          <span
            className="w-6 h-6 flex items-center
                justify-center rounded-md"
          >
            <IconContext.Provider
              value={{
                size: "0.8rem",
                color: "#f1f3f5",
              }}
            >
              <FaStethoscope />
            </IconContext.Provider>
          </span>
          <span
            className="uppercase text-[12px] font-semibold
            text-gray-50"
          >
            Doctor
          </span>
        </div>
        <div className="flex items-start gap-4 text-gray-700">
          <div>
            {props.imageUrl && (
              <img src={props.imageUrl} alt={props.firstName} />
            )}
            {!props.imageUrl && (
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
          <div className="text-sm">
            <p className="text-xl text-gray-800">
              {"Dr." + props.firstName + " " + props.lastName}
            </p>
            <p className="first-letter:uppercase">{props.gender}</p>
            {/* <p>{"Speciality"}</p> */}
            <p className="flex items-start gap-[6px]">
              <span>Last seen:</span>
              <span className="flex flex-col gap-[-4px]s">
                <span>{lastSeenAtDate}</span>
                <span>{lastSeenAtTime}</span>
              </span>
            </p>
          </div>
        </div>

        <div>
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
