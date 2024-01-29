import React, { Fragment } from "react";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { postScheduleTime } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import { TAuthState } from "../../types/auth";

interface EditScheduleTimeTimeProps {
  scheduleId: string;
  start: string;
  end: string;
}

export const EditScheduleTime: React.FC<EditScheduleTimeTimeProps> = (
  props
) => {
  const dispatch: any = useDispatch();

  const auth = useSelector((state: TAuthState) => state.auth);
  const accessToken = auth.accessToken as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: postScheduleTime,
    onSuccess: (response: any) => {
      console.log("response", response);
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
    const startTime = props.start;
    const endTime = props.end;

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
      <div className="flex items-center justify-start gap-4">
        {/* consider using an icon for this operation */}
        <Button
          label={"delete"}
          type="button"
          onClick={() => postScheduleTimeHandler()}
          aria-disabled={isLoading}
        />
        {isLoading && <Loader className="w-4 h-4 stroke-gray-500" />}
      </div>
    </Fragment>
  );
};
