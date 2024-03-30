import React, { Fragment } from "react";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";
import { IconContext } from "react-icons";
import { MdDeleteOutline } from "react-icons/md";

interface DeleteScheduleProps {
  scheduleId: string;
  onDelete: (id: string) => void;
}

export const DeleteSchedule: React.FC<DeleteScheduleProps> = (props) => {
  const dispatch: any = useDispatch();

  const auth = useSelector((state: TAuthState) => state.auth);

  const accessToken = auth.accessToken as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (response: any) => {
      props.onDelete(props.scheduleId);
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
      <div className="flex items-center justify-start gap-2 relative">
        <span
          onClick={() => deleteScheduleHandler()}
          className="cursor-pointer"
        >
          <IconContext.Provider
            value={{
              size: "1.3rem",
              color: "#343a40",
            }}
          >
            <MdDeleteOutline />
          </IconContext.Provider>
        </span>
        {isLoading && (
          <Loader
            className="w-4 h-4 stroke-red-500 
             absolute top-[2px] -right-4"
          />
        )}
      </div>
    </Fragment>
  );
};
