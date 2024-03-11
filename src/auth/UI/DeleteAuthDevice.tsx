import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSessionDevice } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";

interface DisableDeviceProps {
  deviceId: string;
}

export const DeleteAuthDevice: React.FC<DisableDeviceProps> = (props) => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteSessionDevice,
    onSuccess: (response: any) => {
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

  const deleteDeviceHandler = () => {
    const deviceId = props.deviceId;
    if (!deviceId) return;
    mutate({
      sessionDeviceId: deviceId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div>
        {!isLoading && (
          <Button
            type="button"
            label="Delete"
            onClick={() => deleteDeviceHandler()}
            className="text-[12px] w-14 p-1  bg-red-800"
          />
        )}
        {isLoading && (
          <div
            className="bg-red-800 text-gray-50 flex items-center
             justify-center rounded w-14 px-1 py-[6px]"
          >
            <Loader className="w-5 h-5" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
