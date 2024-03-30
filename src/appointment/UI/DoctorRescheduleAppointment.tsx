import React, { Fragment, useState } from "react";
import { Button } from "../../shared/UI/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AppDate } from "../../utils/appDate";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { rescheduleAppointment } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { TAppointment } from "../../types/appointments";
import { DoctorScheduleList } from "../../schedule/UI/DoctorScheduleList";
import { Schedule, ScheduleTime } from "../../types/schedule";
import { AppointmentScheduleTimeSelect } from "./AppointmentScheduleTimeSelect";

interface TileContentProps {
  date: any;
  view?: any;
}

interface DoctorRescheduleAppointmentProps {
  appointment: TAppointment;
  onReschedule: (appointmentId: string) => void;
}

export const DoctorRescheduleAppointment: React.FC<
  DoctorRescheduleAppointmentProps
> = (props) => {
  const appointment = props.appointment;
  const [appointmentDate, setAppointmentDate] = useState(
    new Date(appointment.startsAt)
  );
  const [appointmentStartTime, setAppointmentStartTime] = useState(
    new AppDate(appointment.startsAt).time24hourFormat()
  );
  const [appointmentEndTime, setAppointmentEndTime] = useState(
    new AppDate(appointment.endsAt).time24hourFormat()
  );
  const [appointmentSubject, setAppointmentSubject] = useState(
    appointment.subject
  );
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(
    new Date(appointment.startsAt)
  );

  // const doctorName = `${appointment.patient?.firstName} ${appointment.patient?.lastName}`;
  const doctorName = `Your`;

  const [doctorSchedules, setDoctorSchedules] = useState<Schedule[]>([]);
  const [selectedScheduleTime, setSelectedScheduleTime] = useState<
    ScheduleTime[]
  >([]);

  const onScheduleFetchHandler = (schedules: Schedule[]) => {
    setDoctorSchedules(() => schedules);
  };

  const onSelectScheduleTimeHandler = (scheduleTime: ScheduleTime) => {
    setAppointmentStartTime(() => scheduleTime.start);
    setAppointmentEndTime(() => scheduleTime.end);
  };

  const getWeekDaySchedules = (weekday: string): ScheduleTime[] => {
    const weekDaySchedules = doctorSchedules.find(
      (schedule) => schedule.weekday === weekday
    )!;

    return weekDaySchedules.scheduleTime;
  };

  const appointmentDateChangeHandler = (date: any) => {
    setAppointmentDate(() => date);
    setSelectedAppointmentDate(() => date);

    const weekday = new AppDate(date).getWeekday();

    setSelectedScheduleTime(() => getWeekDaySchedules(weekday));
  };

  const auth = useSelector((state: TAuthState) => state.auth);
  const dispatch: any = useDispatch();

  const weekDay = new AppDate(selectedAppointmentDate).weekday();
  const dayMonthYear = new AppDate(selectedAppointmentDate).dayMonthYear();
  const selectedDate = `${weekDay}, ${dayMonthYear}`;

  const { isLoading, mutate } = useMutation({
    mutationFn: rescheduleAppointment,
    onSuccess: (response: any) => {
      props.onReschedule(appointment.appointmentId);
      dispatch(
        showCardNotification({
          type: "success",
          message: response.message,
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const appointmentRescheduleHandler = () => {
    const appointmentId = appointment.appointmentId;
    const doctorId = appointment.doctorId;
    const patientId = appointment.patientId;
    const startsAt = new AppDate(appointmentDate).addTimeToDate(
      appointmentStartTime
    );
    const endsAt = new AppDate(appointmentDate).addTimeToDate(
      appointmentEndTime
    );
    const subject = appointmentSubject;
    const accessToken = auth.accessToken as string;

    if (!startsAt || !endsAt || !patientId) {
      dispatch(
        showCardNotification({
          type: "error",
          message: "Please ensure that you have selected date and time",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    }

    mutate({
      appointmentId: appointmentId,
      patientId: patientId,
      doctorId: doctorId,
      subject: subject,
      startsAt: startsAt,
      endsAt: endsAt,
      token: accessToken,
    });
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

  const hasScheduleTme: boolean = !!selectedScheduleTime[0];

  return (
    <Fragment>
      <div
        className="p-4 sm:p-8 w-full h-[70vh] overflow-x-hidden
          flex flex-col gap-4"
      >
        <div className="text-sm text-gray-800">
          <DoctorScheduleList
            doctorId={appointment.doctorId}
            doctorName={doctorName}
            onFetch={onScheduleFetchHandler}
          />
        </div>
        <div
          className="text-base border-b-[1px] border-gray-300
           py-2 -mt-4"
        >
          <p className="text-start text-gray-800 font-semibold">
            Select Date and Time
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Calendar
              onChange={appointmentDateChangeHandler}
              value={appointmentDate}
              className="w-full border-none bg-gray-300 text-lg
               rounded h-[300] px-2"
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
                <label htmlFor="start-time" className="text-gray-800 text-sm">
                  Start Time
                </label>
                {!hasScheduleTme && (
                  <span
                    className="bg-gray-300 outline-none focus:border-[2px]
                    border-primary rounded p-2 text-primary text-sm"
                  >
                    No Time Slot
                  </span>
                )}
                {hasScheduleTme && (
                  <AppointmentScheduleTimeSelect
                    scheduleTimes={selectedScheduleTime}
                    onSelectScheduleTime={onSelectScheduleTimeHandler}
                    isStartTime={true}
                    startTimeValue={appointmentStartTime}
                    endTimeValue={appointmentEndTime}
                  />
                )}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="start-time" className="text-gray-800 text-sm">
                  End Time
                </label>
                {!hasScheduleTme && (
                  <span
                    className="bg-gray-300 outline-none focus:border-[2px]
                    border-primary rounded p-2 text-primary text-sm"
                  >
                    No Time Slot
                  </span>
                )}
                {hasScheduleTme && (
                  <AppointmentScheduleTimeSelect
                    scheduleTimes={selectedScheduleTime}
                    onSelectScheduleTime={onSelectScheduleTimeHandler}
                    isEndTime={true}
                    startTimeValue={appointmentStartTime}
                    endTimeValue={appointmentEndTime}
                  />
                )}
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
          {!isLoading && (
            <Button
              label="Save"
              type="button"
              onClick={() => appointmentRescheduleHandler()}
            />
          )}
          {isLoading && (
            <div
              className="bg-primary text-gray-50 flex items-center
               justify-center p-1 w-full rounded"
            >
              <Loader className="w-8 h-8" />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
