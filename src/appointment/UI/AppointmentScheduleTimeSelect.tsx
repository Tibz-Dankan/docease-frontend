import React, { Fragment, useState } from "react";
import { ScheduleTime } from "../../types/schedule";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
import { IconContext } from "react-icons";
import { GoTriangleDown } from "react-icons/go";

interface InputSelectOverlayProps {
  onClose: () => void;
}
const InputSelectOverlay: React.FC<InputSelectOverlayProps> = (props) => {
  return (
    <Fragment>
      <div
        onClick={props.onClose}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50"
      />
    </Fragment>
  );
};

interface AppointmentScheduleTimeSelectProps {
  scheduleTimes: ScheduleTime[];
  onSelectScheduleTime: (scheduleTime: ScheduleTime) => void;
  isStartTime?: boolean;
  isEndTime?: boolean;
  startTimeValue: string;
  endTimeValue: string;
}

export const AppointmentScheduleTimeSelect: React.FC<
  AppointmentScheduleTimeSelectProps
> = (props) => {
  const scheduleTimes = props.scheduleTimes;
  const [showScheduleTimeList, setScheduleTimeList] = useState<boolean>(false);

  const onSelectHandler = (scheduleTime: ScheduleTime) => {
    props.onSelectScheduleTime(scheduleTime);
    setScheduleTimeList(() => false);
  };

  const showStartTimeLabel = props.isStartTime! && !!props.startTimeValue;
  const showEndTimeLabel = props.isEndTime! && !!props.endTimeValue;
  const hasSelectedScheduleTime = showStartTimeLabel || showEndTimeLabel;

  const getScheduleTimeValue = (scheduleTime: ScheduleTime): string => {
    if (props.isStartTime) return convertTo12HourFormat(scheduleTime.start);
    return convertTo12HourFormat(scheduleTime.end);
  };

  return (
    <Fragment>
      <div className="w-full min-w-28 flex flex-col justify-center relative">
        <div
          className="border-gray-600 rounded-t flex
           items-center justify-between p-2 bg-gray-300 text-sm"
          onClick={() => setScheduleTimeList(() => !showScheduleTimeList)}
        >
          {showStartTimeLabel && (
            <span className="text-primary">
              {convertTo12HourFormat(props.startTimeValue)}
            </span>
          )}
          {showEndTimeLabel && (
            <span className="text-primary">
              {convertTo12HourFormat(props.endTimeValue)}
            </span>
          )}
          {!hasSelectedScheduleTime && (
            <span className="text-primary">Select Time</span>
          )}
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.2rem", color: "#868e96" }}>
              <GoTriangleDown />
            </IconContext.Provider>
          </span>
        </div>
        <div className="bottom-[0.5px] h-[2px] bg-gray-400 x-10" />

        {showScheduleTimeList && (
          <ul
            className="animate-opacityZeroToFull absolute top-[42px] w-full
              bg-gray-50 z-[60] shadow-2xl p-2s p-4 rounded-b border-[1px]
              border-gray-300 space-y-2 max-h-60 overflow-x-hidden"
          >
            {scheduleTimes.map((scheduleTime, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => onSelectHandler(scheduleTime)}
                  className="cursor-pointer text-primary text-sm"
                >
                  {getScheduleTimeValue(scheduleTime)}
                </li>
              );
            })}
          </ul>
        )}
        {showScheduleTimeList && (
          <InputSelectOverlay
            onClose={() => setScheduleTimeList(() => false)}
          />
        )}
      </div>
    </Fragment>
  );
};
