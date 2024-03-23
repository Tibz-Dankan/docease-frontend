import React, { ReactNode } from "react";
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

  //TODO: To add notification api to mark the notification as read
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken!
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: (response: any) => {
      console.log("response::::: ", response);
      dispatch(updateOneServerNotification(response?.data?.notification));
      navigate(link, { replace: true });
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

    mutate({
      notificationId: notificationId,
      accessToken: accessToken,
    });
  };

  return (
    <div
      className={`flex items-center justify-between gap-4
       text-gray-800 relative py-2 px-4 md:px-8
       cursor-pointer ${isLoading && "pr-6 md:pr-10"}
       border-b-[1px] border-gray-300 hover:bg-gray-200`}
      onClick={() => markNotificationAsReadHandler()}
    >
      <div>
        <span
          className="cursor-pointer grid place-items-center  bg-gray-300 p-1
          w-10 h-10 rounded-[50%]"
        >
          {icon}
        </span>
      </div>
      <div>
        <span
          className={`${
            !isRead ? "font-semibold" : "text-gray-700"
          } text-start`}
        >
          {message}
        </span>
      </div>
      <div>
        <span
          className={`text-sm ${!isRead ? "font-semibold" : "text-gray-700"}`}
        >{`${elapsedTime(createdAt)} ago`}</span>
      </div>
      {isLoading && (
        <div className="absolute top-5 right-2">
          <Loader className="stroke-gray-600 w-4 h-4" />
        </div>
      )}
    </div>
  );
};
