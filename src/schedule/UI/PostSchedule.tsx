import React, { Fragment } from "react";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { postSchedule } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import { TAuthState } from "../../types/auth";

interface PostScheduleProps {
  weekday: string;
}

export const PostSchedule: React.FC<PostScheduleProps> = (props) => {
  const dispatch: any = useDispatch();

  const auth = useSelector((state: TAuthState) => state.auth);

  const userId = auth.user?.userId as string;
  const accessToken = auth.accessToken as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: postSchedule,
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

  const postScheduleHandler = () => {
    const weekday = props.weekday;
    if (!weekday) return;

    try {
      mutate({
        userId: userId,
        weekday: weekday,
        token: accessToken,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-start gap-4">
        <Button
          label={props.weekday}
          type="button"
          onClick={() => postScheduleHandler()}
          aria-disabled={isLoading}
        />
        {isLoading && <Loader className="w-4 h-4 stroke-gray-500" />}
      </div>
    </Fragment>
  );
};
