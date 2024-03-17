import React, { Fragment, useState } from "react";
import { Button } from "../../shared/UI/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppDate } from "../../utils/appDate";
import { useNavigate } from "react-router-dom";
import { Image } from "../../shared/UI/Image";
import appointmentImg from "../../assets/images/appointment.jpeg";
import { SquareDots } from "../UI/SquareDots";

interface TileContentProps {
  date: any;
  view?: any;
}

export const LandingAppointmentSection: React.FC = () => {
  const [appointmentDate, setAppointmentDate] = useState(new Date(Date.now()));
  const [appointmentStartTime, setAppointmentStartTime] = useState("");
  const [appointmentEndTime, setAppointmentEndTime] = useState("");
  const [appointmentSubject, setAppointmentSubject] = useState("");
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState("");

  const appointmentDateChangeHandler = (date: any) => {
    setAppointmentDate(() => date);
    setSelectedAppointmentDate(() => date);
  };

  const navigate = useNavigate();

  const weekDay = new AppDate(selectedAppointmentDate).weekday();
  const dayMonthYear = new AppDate(selectedAppointmentDate).dayMonthYear();
  const selectedDate = selectedAppointmentDate
    ? `${weekDay}, ${dayMonthYear}`
    : "Appointment Date";

  const appointmentPostHandler = () => {
    navigate("/auth/patient/signup", { replace: false });
  };

  const tileContent = ({ date }: TileContentProps) => {
    if (date.toDateString() === appointmentDate.toDateString()) {
      return (
        <div
          className="absolute top-0 left-0 mx-auto h-full
          w-full border-[2px] border-primary opacity-50"
        ></div>
      );
    }
    return null;
  };

  return (
    <Fragment>
      <div className="space-y-8">
        <div
          className="w-fulls text-center relative bg-transparent
          z-20"
        >
          <p
            className="uppercase text-primary font-semibold text-5xl
            opacity-10"
          >
            Appointment
          </p>
          <p
            className="text-primaryDark font-semibold uppercase
            text-center absolute top-[12px] left-0 right-0 z-0"
          >
            Appointment
          </p>
        </div>
        <div
          className="flex flex-col md:flex-row md:items-end gap-8
           relative z-10"
        >
          <SquareDots
            className="absolute top-2 left-12 md:left-20
            z-[1] opacity-[40%] hidden sm:grid grid-cols-5"
            size={"w-2 h-2"}
            bgColor={"bg-primaryLight"}
            gap={"gap-[6px]"}
            filled={true}
          />
          <div className="w-full">
            <div
              className="inline-block w-full border-[1px] border-primary
              skew-x-2s skew-y-2s rounded-[32px] -rotate-2 md:pb-2"
            >
              <Image
                src={appointmentImg}
                alt={"appointment"}
                className="rounded-[32px] skew-x-2 skew-y-2 rotate-2
                border-[1px] border-gray-300 w-full"
              />
            </div>
          </div>
          <div
            className="w-full p-8 flex flex-col gap-4 border-[1px]
            border-gray-300 rounded-md"
          >
            <div
              className="text-base border-b-[1px] border-gray-300
               py-2 -mt-4"
            >
              <p className="text-start text-gray-800">
                Select Date and Time to make an Appointment
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <Calendar
                  onChange={appointmentDateChangeHandler}
                  value={appointmentDate}
                  className="w-full border-none bg-gray-300 px-0 text-lg
                  rounded h-[300]"
                  tileContent={tileContent}
                  tileClassName="relative"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col justify-center items-start gap-[14px]">
                  <div className="w-full">
                    <p
                      className="text-primary bg-gray-300 px-4 py-2 rounded
                       w-full font-semibold text-center"
                    >
                      {selectedDate}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <label
                      htmlFor="start-time"
                      className="text-gray-800 text-sm"
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={appointmentStartTime}
                      onChange={(event) =>
                        setAppointmentStartTime(event.target.value)
                      }
                      className="bg-gray-300 outline-none focus:border-[2px]
                      border-primary rounded p-2 text-primary"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <label
                      htmlFor="start-time"
                      className="text-gray-800 text-sm"
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      value={appointmentEndTime}
                      onChange={(event) =>
                        setAppointmentEndTime(event.target.value)
                      }
                      className="bg-gray-300 outline-none focus:border-[2px]
                      border-primary rounded p-2 text-primary"
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <label htmlFor="subject" className="text-gray-800 text-sm">
                      Subject
                    </label>
                    <textarea
                      className="w-full bg-gray-300 border-[2px] outline-none
                      border-gray-300 rounded h-24 resize-none p-2
                      focus:border-primary text-sm transition-all"
                      value={appointmentSubject}
                      onChange={(event) =>
                        setAppointmentSubject(() => event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button
                label="Make Appointment"
                type="button"
                onClick={() => appointmentPostHandler()}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
