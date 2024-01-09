import React, { ReactNode } from "react";
import { IconContext } from "react-icons";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineWarningAmber } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface NotificationProps {
  type: string | null;
  onClose: () => void;
  message: string | null;
}

interface NotificationIconProps {
  size?: string;
  children: ReactNode;
}

const NotificationIcon: React.FC<NotificationIconProps> = (props) => {
  return (
    <IconContext.Provider
      value={{
        size: props.size ? props.size : "1.2rem",
        color: "#fff",
      }}
    >
      {props.children}
    </IconContext.Provider>
  );
};

export const Notification: React.FC<NotificationProps> = (props) => {
  const { type, onClose, message } = props;
  let bgColor: string;
  let icon: ReactNode;

  if (type === "success") {
    bgColor = "bg-success";
    icon = (
      <NotificationIcon>
        <IoMdCheckmarkCircleOutline />
      </NotificationIcon>
    );
  } else if (type === "error") {
    bgColor = "bg-error";
    icon = (
      <NotificationIcon>
        <MdErrorOutline />
      </NotificationIcon>
    );
  } else if (type === "info") {
    bgColor = "bg-info";
    icon = (
      <NotificationIcon>
        <IoMdInformationCircleOutline />
      </NotificationIcon>
    );
  } else if (type === "warning") {
    bgColor = "bg-warning";
    icon = (
      <NotificationIcon>
        <MdOutlineWarningAmber />
      </NotificationIcon>
    );
  } else {
    bgColor = "bg-info";
    icon = (
      <NotificationIcon>
        <IoMdInformationCircleOutline />
      </NotificationIcon>
    );
  }

  return (
    <div
      className={`fixed top-5  right-5  z-[10000] 
      flex w-72 animate-opacityZeroToFull items-center
      justify-start gap-2 rounded ${bgColor} 
      rounded p-3 shadow-lg`}
    >
      <span className="absolute right-1 top-1 cursor-pointer" onClick={onClose}>
        <NotificationIcon size="1.2rem">
          <IoClose />
        </NotificationIcon>
      </span>
      <div>{icon}</div>
      <div>
        <span className="text-sm  leading-[4px] text-[#fff]">{message}</span>
      </div>
    </div>
  );
};
