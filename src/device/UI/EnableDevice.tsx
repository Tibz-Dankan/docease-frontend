import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enableDevice } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";

interface EnableDeviceProps {
  deviceId: string;
}

export const EnableDevice: React.FC<EnableDeviceProps> = (props) => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: enableDevice,
    onSuccess: (response: any) => {
      dispatch(
        showCardNotification({ type: "error", message: response.message })
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

  const enableDeviceHandler = () => {
    const deviceId = props.deviceId;
    if (!deviceId) return;
    mutate({
      deviceId: deviceId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div>
        {!isLoading && (
          <Button
            type="button"
            label="Enable"
            onClick={() => enableDeviceHandler()}
            className="text-[12px] w-14 p-1"
          />
        )}
        {isLoading && (
          <div
            className="bg-primary text-gray-50 flex items-center
             justify-center rounded w-14 px-1 py-[6px]"
          >
            <Loader className="w-5 h-5" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
