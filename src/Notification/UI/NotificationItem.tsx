import React, { Fragment, ReactNode, useState } from "react";
import { IconContext } from "react-icons";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TServerNotification } from "../../types/notification";
import { PiBrainLight, PiChatsCircleLight } from "react-icons/pi";
import { VscHistory } from "react-icons/vsc";
import { CiCalendarDate } from "react-icons/ci";
import { elapsedTime } from "../../utils/elapsedTime";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
  updateOneServerNotification,
} from "../../store/actions/notification";
import { markNotificationAsRead } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { truncateString } from "../../utils/truncateString";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { AppDate } from "../../utils/appDate";

interface NotificationItemProps {
  notification: TServerNotification;
}

interface NotificationIconProps {
  size?: string;
  color?: string;
  children: ReactNode;
}

const NotificationIcon: React.FC<NotificationIconProps> = (props) => {
  return (
    <IconContext.Provider
      value={{
        size: props.size ? props.size : "1.2rem",
        color: props.color ? props.color : "#495057",
      }}
    >
      {props.children}
    </IconContext.Provider>
  );
};

export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { notificationId, link, message, createdAt, isRead } =
    props.notification;
  let icon: ReactNode;
  const iconColor = isRead ? "#495057" : "#000000";

  if (link?.includes("appointments")) {
    icon = (
      <NotificationIcon color={iconColor}>
        <CiCalendarDate />
      </NotificationIcon>
    );
  } else if (link?.includes("messages")) {
    icon = (
      <NotificationIcon color={iconColor}>
        <PiChatsCircleLight />
      </NotificationIcon>
    );
  } else if (link?.includes("medical-history")) {
    icon = (
      <NotificationIcon color={iconColor}>
        <VscHistory />
      </NotificationIcon>
    );
  } else if (link?.includes("mental-health")) {
    icon = (
      <NotificationIcon color={iconColor}>
        <PiBrainLight />
      </NotificationIcon>
    );
  } else {
    icon = (
      <NotificationIcon color={iconColor}>
        <IoIosNotificationsOutline />
      </NotificationIcon>
    );
  }

  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken!
  );
  const userRole = useSelector((state: TAuthState) => state.auth.user?.role!);
  const [showDetailedMessage, setShowDetailedMessage] =
    useState<boolean>(false);

  const showDetailedMessageHandler = () => {
    setShowDetailedMessage(() => !showDetailedMessage);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: (response: any) => {
      dispatch(updateOneServerNotification(response?.data?.notification));
      navigate(`/${userRole}${link}`, { replace: false });
      return;
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const markNotificationAsReadHandler = () => {
    if (!notificationId) return;
    if (isRead) {
      navigate(`/${userRole}${link}`, { replace: false });
      return;
    }

    mutate({
      notificationId: notificationId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      {!showDetailedMessage && (
        <div
          className="flex items-center justify-between gap-4
           text-gray-800 relatives py-2 px-4 md:px-8
           border-b-[1px] border-gray-300 hover:bg-gray-200
           transition-all"
        >
          <div>
            <span
              className="cursor-pointer grid place-items-center 
               bg-gray-300 p-1 w-10 h-10 rounded-[50%]"
            >
              {icon}
            </span>
          </div>
          <div
            onClick={() => markNotificationAsReadHandler()}
            className="flex items-center gap-2 cursor-pointer relative"
          >
            <span
              className={`${
                !isRead ? "font-semibold" : "text-gray-700"
              } text-start`}
            >
              {truncateString(message, 44)}
            </span>
            {isLoading && (
              <div className="absolute top-1 -right-[17px]">
                <Loader className="stroke-gray-600 w-4 h-4" />
              </div>
            )}
          </div>
          <div>
            <span
              className={`text-sm ${
                !isRead ? "font-semibold" : "text-gray-700"
              }`}
            >{`${elapsedTime(createdAt)} ago`}</span>
          </div>
          <div
            className="flex items-center justify-center p-1 sm:p-2 
             rounded-md cursor-pointer border-[1px] 
             border-gray-400"
            onClick={() => showDetailedMessageHandler()}
          >
            {!showDetailedMessage && (
              <span>
                <IconContext.Provider
                  value={{ size: "1.0rem", color: "#495057" }}
                >
                  <HiChevronDown />
                </IconContext.Provider>
              </span>
            )}
          </div>
        </div>
      )}

      {showDetailedMessage && (
        <div
          className={`flex flex-col items-center justify-between 
            gap-2 text-gray-800 relative py-2 px-4 md:px-8
            cursor-pointer ${isLoading && "pr-6 md:pr-10"}
            border-b-[1px] border-gray-300 transition-all py-4 pb-6`}
        >
          <div className="w-full flex items-center justify-between gap-4">
            <div>
              <span
                className="cursor-pointer grid place-items-center 
                bg-gray-300s p-1 w-10 h-10 rounded-[50%] border-[1px]
                border-gray-400"
              >
                {icon}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm ${
                  !isRead ? "font-semibold" : "text-gray-700"
                }`}
              >
                {`${new AppDate(createdAt).monthDayYear()},`}
              </span>

              <span
                className={`text-sm ${
                  !isRead ? "font-semibold" : "text-gray-700"
                }`}
              >
                {`${new AppDate(createdAt).time()}`}
              </span>

              <span
                onClick={() => showDetailedMessageHandler()}
                className="flex items-center justify-center p-1 sm:p-[6px] 
                rounded-md cursor-pointer border-[1px] 
                border-gray-400"
              >
                <IconContext.Provider
                  value={{ size: "1rem", color: "#495057" }}
                >
                  <HiChevronUp />
                </IconContext.Provider>
              </span>
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-4
             border-[1px] border-gray-300 rounded-2xl p-2 sm:p-4
             text-sm sm:text-base bg-gray-200 relative"
            onClick={() => markNotificationAsReadHandler()}
          >
            <span
              className={`${
                !isRead ? "font-semibold" : "text-gray-700"
              } text-start`}
            >
              {message}
            </span>
            {isLoading && (
              <div className="absolute top-0 sm:top-2 right-0 sm:right-2">
                <Loader className="stroke-gray-600 w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
