import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FaUserLock } from "react-icons/fa6";

export const SettingsHeader: React.FC = () => {
  const scrollToElement = (id: string) => {
    if (!id) return;

    const element = document.querySelector(id)!;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Fragment>
      <div
        className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4
        text-gray-800 bg-white p-4 rounded-md shadow-md px-8"
      >
        <div
          className="flex flex-col items-center justify-center gap-2 
          cursor-pointer"
          onClick={() => scrollToElement("#update-profile")}
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
             hover:underline text-center"
          >
            Update Profile
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-2 
           cursor-pointer"
          onClick={() => scrollToElement("#change-password")}
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
             hover:underline text-center"
          >
            Change Password
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-2
           cursor-pointer"
          onClick={() => scrollToElement("#push-notification")}
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
             hover:underline text-center"
          >
            Push Notifications
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-2 
           cursor-pointer"
          onClick={() => scrollToElement("#twofa")}
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
             hover:underline text-center"
          >
            2FA
          </span>
        </div>
      </div>
    </Fragment>
  );
};
