import React, { Fragment, useState, useEffect } from "react";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { updateScheduleTime } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";

interface EditScheduleTimeTimeProps {
  scheduleTimeId: string;
  start: string;
  end: string;
  onEdit: (id: string) => void;
}

export const EditScheduleTime: React.FC<EditScheduleTimeTimeProps> = (
  props
) => {
  const dispatch: any = useDispatch();

  const auth = useSelector((state: TAuthState) => state.auth);
  const accessToken = auth.accessToken as string;

  const [startTime, setStartTime] = useState(props.start);
  const [endTime, setEndTime] = useState(props.end);

  // const [InitialStartTime, setInitialStartTime] = useState(props.start);
  // const [InitialEndTime, setInitialEndTime] = useState(props.end);
  const [InitialStartTime] = useState(props.start);
  const [InitialEndTime] = useState(props.end);

  const timeHasChanged: boolean =
    startTime !== InitialStartTime || endTime !== InitialEndTime;

  const { isLoading, mutate } = useMutation({
    mutationFn: updateScheduleTime,
    onSuccess: (response: any) => {
      props.onEdit(props.scheduleTimeId);
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

  useEffect(() => {
    const editScheduleTimeHandler = () => {
      const scheduleTimeId = props.scheduleTimeId;

      if (!timeHasChanged) return;

      if (!scheduleTimeId || !startTime || !endTime) return;

      try {
        mutate({
          scheduleTimeId: scheduleTimeId,
          start: startTime,
          end: endTime,
          token: accessToken,
        });
      } catch (err: any) {
        console.log(err.message);
      }
    };

    editScheduleTimeHandler();
  }, [startTime, endTime]);

  return (
    <Fragment>
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-center gap-2">
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
        </div>
        {isLoading && <Loader className="w-4 h-4 stroke-gray-600" />}
      </div>
    </Fragment>
  );
};
