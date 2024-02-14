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

  // const devices: TDevice[] = [
  //   {
  //     deviceId: "1",
  //     userId: "user1",
  //     devicePlatform: "windows",
  //     deviceToken: "token1",
  //     isDisable: true,
  //     createdAt: "2024-02-14",
  //     updatedAt: "2024-02-14",
  //   },
  //   {
  //     deviceId: "2",
  //     userId: "user2",
  //     devicePlatform: "linux",
  //     deviceToken: "token2",
  //     isDisable: false,
  //     createdAt: "2024-02-14",
  //     updatedAt: "2024-02-14",
  //   },
  //   {
  //     deviceId: "3",
  //     userId: "user3",
  //     devicePlatform: "android",
  //     deviceToken: "token3",
  //     isDisable: true,
  //     createdAt: "2024-02-14",
  //     updatedAt: "2024-02-14",
  //   },
  //   {
  //     deviceId: "4",
  //     userId: "user4",
  //     devicePlatform: "ios",
  //     deviceToken: "token4",
  //     isDisable: false,
  //     createdAt: "2024-02-14",
  //     updatedAt: "2024-02-14",
  //   },
  //   {
  //     deviceId: "5",
  //     userId: "user5",
  //     devicePlatform: "macOS",
  //     deviceToken: "token5",
  //     isDisable: true,
  //     createdAt: "2024-02-14",
  //     updatedAt: "2024-02-14",
  //   },
  //   {
  //     deviceId: "6",
  //     userId: "user6",
  //     devicePlatform: "web",
  //     deviceToken: "token6",
  //     isDisable: false,
  //     createdAt: "2024-02-14",
  //     updatedAt: "2024-02-14",
  //   },
  // ];

  console.log(devices);

  return (
    <Fragment>
      <div className="space-y-2">
        <div
          className="w-full text-start text-gray-700 
           text-xl font-semibold"
        >
          {/* <p>Your devices that currently receive push notifications</p> */}
          <p>Your devices </p>
        </div>
        {devices?.map((device, index) => (
          <div
            key={index}
            className="flex items-center justify-between 
             gap-4 text-gray-800"
          >
            <span className="first-letter:uppercase">
              {device.devicePlatform}
            </span>
            <span className="text-sm flex items-center justify-start gap-2">
              <span>{new AppDate(device.createdAt).dayMonthYear()}</span>
              <span className="hidden sm:block">
                {new AppDate(device.createdAt).time()}
              </span>
            </span>
            {device.isDisable && <EnableDevice deviceId={device.deviceId} />}
            {!device.isDisable && <DisableDevice deviceId={device.deviceId} />}
          </div>
        ))}
      </div>
    </Fragment>
  );
};
