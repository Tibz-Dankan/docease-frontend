import React, { Fragment } from "react";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteScheduleTime } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";
import { MdDeleteOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import { clearReload, updateReload } from "../../store/actions/reload";

interface DeleteScheduleTimeProps {
  scheduleTimeId: string;
  onDelete: (id: string) => void;
}

export const DeleteScheduleTime: React.FC<DeleteScheduleTimeProps> = (
  props
) => {
  const dispatch: any = useDispatch();

  const auth = useSelector((state: TAuthState) => state.auth);

  const accessToken = auth.accessToken as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteScheduleTime,
    onSuccess: (response: any) => {
      props.onDelete(props.scheduleTimeId);
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

  const deleteScheduleTimeHandler = () => {
    const scheduleTimeId = props.scheduleTimeId;
    if (!scheduleTimeId) return;

    try {
      mutate({
        scheduleTimeId: scheduleTimeId,
        token: accessToken,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-start gap-0">
        <span
          onClick={() => deleteScheduleTimeHandler()}
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
        {isLoading && <Loader className="w-4 h-4 stroke-gray-600" />}
      </div>
    </Fragment>
  );
};
