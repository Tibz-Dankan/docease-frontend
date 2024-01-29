import React, { Fragment } from "react";
import ScheduleMockData from "../../appointment/data/schedule-mock.json";
import { buildScheduleList } from "../../utils/buildScheduleList";

export const ScheduleLayout: React.FC = () => {
  // const schedules = ScheduleMockData.schedules;

  // console.log("schedules", schedules);
  // const buildScheduleList

  const scheduleList = buildScheduleList(ScheduleMockData.schedules);

  console.log("scheduleList", scheduleList);

  return (
    <Fragment>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col gap-2 bg-white rounded w-full">
          {scheduleList.map((schedule, index) => (
            <div key={index}>
              <span className="text-lgs text-gray-800">{schedule.weekday}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 bg-white rounded w-full">
          <div>
            {scheduleList.map((schedule, index) => (
              <div key={index} className="flex flex-col gap-4">
                <p
                  className="text-lg font-semibold text-primary 
                  text-center w-full bg-gray-300 rounded 
                  first-letter:uppercase"
                >
                  {schedule.weekday}
                </p>
                <div className="flex flex-col gap-2">
                  {schedule.scheduleTime.map((scheduleTime, index) => (
                    <p
                      className="flex items-center justify-center gap-2
                      text-sm text-gray-800"
                      key={index}
                    >
                      <span className="bg-gray-300  px-4 py-2 rounded">
                        {scheduleTime.start}
                      </span>
                      <span className="bg-gray-300  px-4 py-2 rounded">
                        {scheduleTime.end}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
