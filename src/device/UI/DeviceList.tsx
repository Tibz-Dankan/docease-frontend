import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { TDevice } from "../../types/device";
import { AppDate } from "../../utils/appDate";
import { EnableDevice } from "./EnableDevice";
import { DisableDevice } from "./DisableDevice";
import { getDevicesByUser } from "../API";

export const DeviceList: React.FC = () => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;
  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;

  const { isLoading, data } = useQuery({
    queryKey: [`devices-${userId}`],
    queryFn: () =>
      getDevicesByUser({ userId: userId, accessToken: accessToken }),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />
      </div>
    );

  const devices = data?.data?.devices as TDevice[];

  return (
    <Fragment>
      <div>
        {devices?.map((device, index) => (
          <div key={index} className="flex items-center justify-center gap-4">
            <span>{device.devicePlatform}</span>
            <span>
              {new AppDate(device.createdAt).dayMonthYear()}{" "}
              {new AppDate(device.createdAt).time()}
            </span>
            {device.isDisable && <EnableDevice />}
            {!device.isDisable && <DisableDevice />}
          </div>
        ))}
      </div>
    </Fragment>
  );
};
