import React, { Fragment, useState } from "react";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { clearReload, updateReload } from "../../store/actions/reload";
import { postScheduleTime } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";
import { IconContext } from "react-icons";
import { LuPlus } from "react-icons/lu";

interface PostScheduleTimeProps {
  scheduleId: string;
  onPost: (id: string) => void;
}

export const PostScheduleTime: React.FC<PostScheduleTimeProps> = (props) => {
  const dispatch: any = useDispatch();
  const auth = useSelector((state: TAuthState) => state.auth);

  const accessToken = auth.accessToken as string;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { isLoading, mutate } = useMutation({
    mutationFn: postScheduleTime,
    onSuccess: (response: any) => {
      props.onPost(response?.data?.scheduleTime?.scheduleTimeId);
      dispatch(updateReload({ isReloading: true, entity: "schedules" }));
      setTimeout(() => {
        dispatch(clearReload());
      }, 1000);

      dispatch(
        showCardNotification({ type: "success", message: response.message })
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

  const postScheduleTimeHandler = () => {
    const scheduleId = props.scheduleId;

    if (!scheduleId || !startTime || !endTime) return;

    try {
      mutate({
        scheduleId: scheduleId,
        start: startTime,
        end: endTime,
        token: accessToken,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-start gap-3 relative bg-blue">
        <div
          className="flex items-center justify-center gap-2 p-2
          border-gray-400 border-[1px] rounded"
        >
          <input
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(() => event.target.value)}
            className="bg-gray-300 outline-none border-[2px]
            border-gray-300 focus:border-primary rounded p-1
            text-gray-800 text-sm"
          />
          <input
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(() => event.target.value)}
            className="bg-gray-300 outline-none border-[2px]
            border-gray-300 focus:border-primary rounded p-1
            text-gray-800 text-sm"
          />
          <div>
            {!isLoading && (
              <span
                onClick={() => postScheduleTimeHandler()}
                className="cursor-pointer"
              >
                <IconContext.Provider
                  value={{
                    size: "1.2rem",
                    color: "#42968D",
                  }}
                >
                  <LuPlus />
                </IconContext.Provider>
              </span>
            )}
            {isLoading && <Loader className="w-4 h-4 stroke-primary" />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
