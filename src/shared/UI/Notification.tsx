import React, { Fragment, ReactNode } from "react";
import { IconContext } from "react-icons";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineWarningAmber } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { truncateString } from "../../utils/truncateString";

interface NotificationProps {
  type: string | null;
  onClose: () => void;
  message: string | null;
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
        size: props.size ? props.size : "1.4rem",
        color: props.color ? props.color : "#343a40",
      }}
    >
      {props.children}
    </IconContext.Provider>
  );
};

export const Notification: React.FC<NotificationProps> = (props) => {
  const { type, onClose, message } = props;
  let bgColor: string;
  let bgColorLight: string;
  let iconColor: string;
  let icon: ReactNode;

  if (type === "success") {
    bgColor = "bg-success";
    bgColorLight = "bg-green-50";
    iconColor = "#55C57A";
    icon = (
      <NotificationIcon color={iconColor}>
        <IoMdCheckmarkCircleOutline />
      </NotificationIcon>
    );
  } else if (type === "error") {
    bgColor = "bg-error";
    bgColorLight = "bg-red-50";
    iconColor = "#fa5252";
    icon = (
      <NotificationIcon color={iconColor}>
        <MdErrorOutline />
      </NotificationIcon>
    );
  } else if (type === "info") {
    bgColor = "bg-info";
    bgColorLight = "bg-blue-50";
    iconColor = "#5BC0DE";
    icon = (
      <NotificationIcon color={iconColor}>
        <IoMdInformationCircleOutline />
      </NotificationIcon>
    );
  } else if (type === "warning") {
    bgColor = "bg-warning";
    bgColorLight = "bg-yellow-50";
    iconColor = "#F0AD4E";
    icon = (
      <NotificationIcon color={iconColor}>
        <MdOutlineWarningAmber />
      </NotificationIcon>
    );
  } else {
    bgColor = "bg-info";
    bgColorLight = "bg-blue-50";
    iconColor = "#5BC0DE";
    icon = (
      <NotificationIcon color={iconColor}>
        <IoMdInformationCircleOutline />
      </NotificationIcon>
    );
  }

  return (
    <Fragment>
      <div
        className={`fixed top-5 right-5  z-[10000] 
         flex flex-col items-center justify-start w-72 sm:w-80 
         animate-slideDown rounded-md shadow-xl bg-white border-[1px]
        border-gray-300 border-b-[0px]`}
      >
        <div className="flex items-center justify-between gap-4 p-4 bg-green-500s">
          <div>{icon}</div>
          <div>
            <span className="text-sm leading-[2px] text-gray-800">
              {truncateString(message!, 48)}
            </span>
          </div>
          <div>
            <span className="cursor-pointer" onClick={onClose}>
              <NotificationIcon size="1.4rem" color="#868e96">
                <IoCloseOutline />
              </NotificationIcon>
            </span>
          </div>
        </div>
        <div className={`${bgColorLight} w-full h-2 rounded-b-md relative`}>
          <div
            className={`absolute left-0 top-0 h-full rounded-b-md
            w-full ${bgColor}  
            animate-radiate`}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};
