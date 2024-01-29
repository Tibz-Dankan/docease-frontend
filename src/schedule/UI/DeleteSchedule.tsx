import React, { Fragment } from "react";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import { TAuthState } from "../../types/auth";

interface DeleteScheduleProps {
  scheduleId: string;
}

export const DeleteSchedule: React.FC<DeleteScheduleProps> = (props) => {
  const dispatch: any = useDispatch();

  const auth = useSelector((state: TAuthState) => state.auth);

  const accessToken = auth.accessToken as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteSchedule,
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

  const deleteScheduleHandler = () => {
    const scheduleId = props.scheduleId;
    if (!scheduleId) return;

    try {
      mutate({
        scheduleId: scheduleId,
        token: accessToken,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-start gap-4">
        {/* consider using an icon for this */}
        <Button
          label={"Delete"}
          type="button"
          onClick={() => deleteScheduleHandler()}
          aria-disabled={isLoading}
        />
        {isLoading && <Loader className="w-4 h-4 stroke-gray-500" />}
      </div>
    </Fragment>
  );
};
