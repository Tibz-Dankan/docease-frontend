import React, { Fragment, useEffect, useState } from "react";
import { buildScheduleList } from "../../utils/buildScheduleList";
import { Modal } from "../../shared/UI/Modal";
import { Button } from "../../shared/UI/Button";
import { PostSchedule } from "../UI/PostSchedule";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { DeleteSchedule } from "../UI/DeleteSchedule";
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
import { Schedule } from "../../types/schedule";
import { clearReload } from "../../store/actions/reload";

export const ScheduleLayout: React.FC = () => {
  const dispatch: any = useDispatch();
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const user = useSelector((state: TAuthState) => state.auth.user);

  const getScheduleByUserHandler = async () => {
    try {
      setIsLoading(() => true);
      const data: any = await getScheduleByUser({
        userId: user?.userId!,
        token: token,
      });

      const scheduleList = buildScheduleList(data?.data?.schedules);
      setScheduleList(() => {
        return scheduleList;
      });
      setIsLoading(() => false);
      dispatch(clearReload());
    } catch (error: any) {
      console.log("error->", error.message);
      setIsLoading(() => false);
      dispatch(clearReload());
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    }
  };

  useEffect(() => {
    getScheduleByUserHandler();

    return () => {
      setScheduleList(() => {
        return [];
      });
    };
  }, []);

  console.log("scheduleList", scheduleList);

  const hasSchedule = !!scheduleList[0];

  return (
    <Fragment>
      <Modal
        openModalElement={
          <Button
            type="button"
            label={hasSchedule ? "Update Schedule" : "Add Schedule"}
            className="w-32 text-sm mt-8"
          />
        }
        className="p-8 pt-12 relative text-end"
      >
        {isLoading && (
          <div className="absolute top-3 left-12">
            <Loader className="w-6 h-6 stroke-gray-600 px-2" />
          </div>
        )}
        <div
          className="absolute top-3 right-12 flex items-center
          justify-center bg-yellow-800 rounded text-white
          px-2"
          onClick={() => getScheduleByUserHandler()}
        >
          {isLoading && <Loader className="w-4 h-4 stroke-yellow-800s ml-2" />}
          <Button
            label="Reload"
            type="button"
            className="bg-yellow-800 text-sm text-white py-1"
          />
        </div>
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
