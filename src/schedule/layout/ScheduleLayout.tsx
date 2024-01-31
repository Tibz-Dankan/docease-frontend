import React, { Fragment } from "react";
import { buildScheduleList } from "../../utils/buildScheduleList";
import { Modal } from "../../shared/UI/Modal";
import { Button } from "../../shared/UI/Button";
import { PostSchedule } from "../UI/PostSchedule";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { DeleteSchedule } from "../UI/DeleteSchedule";
import { useQuery } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/reducers/notification";
import { getScheduleByUser } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";
import { EditScheduleTime } from "../UI/EditScheduleTime";
import { DeleteScheduleTime } from "../UI/DeleteScheduleTime";
import { PostScheduleTime } from "../UI/PostScheduleTime";

export const ScheduleLayout: React.FC = () => {
  const dispatch: any = useDispatch();

  const token = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const user = useSelector((state: TAuthState) => state.auth.user);

  const { isLoading, data } = useQuery({
    queryKey: [`schedules-${user?.userId}`],
    queryFn: () => getScheduleByUser({ userId: user?.userId!, token: token }),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading)
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;

  console.log("API response data for schedules ->", data);

  // const scheduleList = buildScheduleList(ScheduleMockData.schedules);
  const scheduleList = buildScheduleList(data.data?.schedules);

  console.log("scheduleList", scheduleList);

  // const hasSchedule = !!ScheduleMockData.schedules[0];
  const hasSchedule = !!data.data?.schedules[0];

  return (
    <Fragment>
      <Modal
        openModalElement={
          <Button
            type="button"
            label={hasSchedule ? "Update Schedule" : "Add Schedule"}
            className="w-32 text-sm"
          />
        }
        className="p-8"
      >
        <div
          className="flex items-start justify-center gap-4
          w-[92%] sm:w-[600px] sm:h-[70vh]"
        >
          <div
            className="flex flex-col gap-2 bg-whites bg-gray-200 
            rounded w-full items-center p-4"
          >
            <div
              className="border-b-[1px] border-gray-300 w-full 
              text-center pb-2"
            >
              <span className="text-gray-800s text-primary font-bold">
                Weekly
              </span>
            </div>
            {scheduleList.map((schedule, index) => (
              <div key={index}>
                {schedule.scheduleId && (
                  <div className="flex items-center justify-center w-full gap-4">
                    <span>
                      <IconContext.Provider
                        value={{
                          size: "1.4rem",
                          color: "#343a40",
                        }}
                      >
                        <IoMdCheckmark />
                      </IconContext.Provider>
                    </span>
                    <span className="text-gray-800 first-letter:uppercase">
                      {schedule.weekday}
                    </span>
                    <DeleteSchedule scheduleId={schedule.scheduleId} />
                  </div>
                )}
                {!schedule.scheduleId && (
                  <div className="w-full">
                    <PostSchedule weekday={schedule.weekday} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col gap-2 bg-white rounded w-full
             sm:h-[70vh] overflow-x-hidden"
          >
            <div>
              {!hasSchedule && (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-gray-800 text-lg text-center">
                    You no schedules yet
                  </p>
                </div>
              )}
              {hasSchedule &&
                scheduleList.map((schedule, index) => {
                  if (!schedule.scheduleId) return;

                  return (
                    <div key={index} className="flex flex-col gap-4">
                      <p
                        className="text-lg text-primary 
                       text-center w-full bg-gray-300 rounded 
                       first-letter:uppercase py-2"
                      >
                        {schedule.weekday}
                      </p>
                      <div className="flex flex-col gap-2">
                        {schedule.scheduleTime.map((scheduleTime, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-center gap-2">
                              <EditScheduleTime
                                start={scheduleTime.start}
                                end={scheduleTime.end}
                                scheduleTimeId={scheduleTime.scheduleTimeId}
                              />
                              <DeleteScheduleTime
                                scheduleTimeId={scheduleTime.scheduleTimeId}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mb-4">
                        <PostScheduleTime scheduleId={schedule.scheduleId} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
