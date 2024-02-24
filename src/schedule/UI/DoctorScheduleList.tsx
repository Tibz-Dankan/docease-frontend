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
import { useReload } from "../../hooks/useReload";
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

  const { isLoading: isLoadingSchedules, data: serverData } = useQuery({
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

  let isLoadingData: boolean = isLoadingSchedules;
  let serverResponseData: any = serverData;

  const { isLoading, data } = useReload(
    () => getScheduleByUser({ userId: doctorId, token: token }),
    `doctor-schedule-${doctorId}`,
    "schedules"
  );

  isLoadingData = isLoading;
  serverResponseData = data;

  if (isLoadingData) {
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;
  }

  if (!data) return;

  const scheduleList = buildScheduleList(serverResponseData?.data?.schedules);

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
            <p>{"Dr. " + props.doctorName + " Appointment Schedule"}</p>
          </div>
          <div
            className="border-b-[1px] border-gray-300
            text-primary space-y-4 py-4 h-auto"
          >
            {scheduleList.map((schedule, index) => {
              if (showScheduleItem(schedule)) {
                return (
                  <div key={index} className="flex items-center gap-4">
                    <p
                      className="w-20 text-start first-letter:uppercase
                    text-gray-800"
                    >
                      {schedule.weekday}
                    </p>
                    <p className="space-x-2">
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
                    </p>
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
