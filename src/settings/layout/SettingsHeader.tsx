import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FaUserLock } from "react-icons/fa6";

export const SettingsHeader: React.FC = () => {
  return (
    <Fragment>
      <div
        className="w-full flex items-center justify-between gap-4
        text-gray-800 bg-white p-4 rounded-md shadow-md px-8"
      >
        <div
          className="flex flex-col items-center justify-center gap-2 
          cursor-pointer"
        >
          <span
            className="cursor-pointer grid place-items-center 
            bg-gray-300 p-1 w-10 h-10 rounded-[50%]"
          >
            <IconContext.Provider value={{ size: "1.2rem", color: "#495057" }}>
              <IoPerson />
            </IconContext.Provider>
          </span>
          <span
            className="focus:text-primary hover:text-primary
             hover:underline"
          >
            Update profile
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-3 
           cursor-pointer"
        >
          <span
            className="cursor-pointer grid place-items-center 
            bg-gray-300 p-1 w-10 h-10 rounded-[50%]"
          >
            <IconContext.Provider value={{ size: "1.2rem", color: "#495057" }}>
              <MdOutlinePassword />
            </IconContext.Provider>
          </span>
          <span
            className="focus:text-primary hover:text-primary
             hover:underline"
          >
            Change Password
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-3
           cursor-pointer"
        >
          <span
            className="cursor-pointer grid place-items-center 
            bg-gray-300 p-1 w-10 h-10 rounded-[50%]"
          >
            <IconContext.Provider value={{ size: "1.2rem", color: "#495057" }}>
              <IoMdNotifications />
            </IconContext.Provider>
          </span>
          <span
            className="focus:text-primary hover:text-primary
             hover:underline"
          >
            Push Notifications
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-3 
           cursor-pointer"
        >
          <span
            className="cursor-pointer grid place-items-center 
            bg-gray-300 p-1 w-10 h-10 rounded-[50%]"
          >
            <IconContext.Provider value={{ size: "1.2rem", color: "#495057" }}>
              <FaUserLock />
            </IconContext.Provider>
          </span>
          <span
            className="focus:text-primary hover:text-primary
             hover:underline"
          >
            2FA
          </span>
        </div>
      </div>
    </Fragment>
  );
};
