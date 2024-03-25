import React, { Fragment } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { Loader } from "../../shared/UI/Loader";
import { getScheduleByUser } from "../API";
import { buildScheduleList } from "../../utils/buildScheduleList";
import { Schedule } from "../../types/schedule";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
interface DoctorScheduleListProps {
  doctorId: string;
  doctorName: string;
  onFetch: (schedules: Schedule[]) => void;
}

export const DoctorScheduleList: React.FC<DoctorScheduleListProps> = (
  props
) => {
  const dispatch: any = useDispatch();

  const token = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const doctorId = props.doctorId;

  const { isLoading, data } = useQuery({
    queryKey: [`doctor-schedule-${doctorId}`],
    queryFn: () => getScheduleByUser({ userId: doctorId, token: token }),
    onSuccess: (response: any) => {
      const scheduleList = buildScheduleList(response.data?.schedules);
      props.onFetch(scheduleList);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;
  }

  if (!data) return;

  const scheduleList = buildScheduleList(data?.data?.schedules);

  const showScheduleItem = (schedule: Schedule): boolean => {
    let showSchedule: boolean = !!(
      schedule.scheduleId && schedule.scheduleTime[0]
    );
    if (showSchedule) return true;

    return false;
  };

  return (
    <Fragment>
      <div>
        <div className="text-sm text-gray-800">
          <div
            className="text-lg border-b-[1px] border-gray-300 pb-2
            text-gray-800 font-semibold"
          >
            <p>{props.doctorName + " Appointment Schedule"}</p>
          </div>
          <div
            className="border-b-[1px] border-gray-300
            text-primary space-y-2 py-4 h-auto"
          >
            {scheduleList.map((schedule, index) => {
              if (showScheduleItem(schedule)) {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-start sm:flex-row 
                     sm:items-center gap-2 sm:gap-4"
                  >
                    <div
                      className="w-20 text-start first-letter:uppercase
                      text-gray-800"
                    >
                      {schedule.weekday}
                    </div>
                    <div className="space-x-2s grid grid-cols-2 md:grid-cols-3 gap-2">
                      {schedule.scheduleTime.map((timeSlot, index) => (
                        <span
                          key={index}
                          className="bg-gray-300 rounded p-2 text-center
                          text-[12px] font-semibold"
                        >
                          {convertTo12HourFormat(timeSlot.start)} -{" "}
                          {convertTo12HourFormat(timeSlot.end)}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
