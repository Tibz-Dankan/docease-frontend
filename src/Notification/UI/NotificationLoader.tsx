import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";

export const NotificationLoader: React.FC = () => {
  const notifications = [1, 2, 3, 4, 5, 6];

  return (
    <Fragment>
      <div
        className="w-full bg-gray-50 p-4 px-2 rounded-md shadow-md
         md:max-w-[700px]"
      >
        <div>
          <div
            className="w-full flex items-center justify-center gap-2
             border-b-[1px] border-gray-300 px-4 pb-3"
          >
            <span>
              <IconContext.Provider
                value={{
                  size: "1.6rem",
                  color: "#1c7ed6",
                }}
              >
                <IoMdNotificationsOutline />
              </IconContext.Provider>
            </span>
            <span className="text-xl text-primary">Notifications</span>
          </div>
          <div>
            <div
              className="text-gray-800 flex items-center 
               justify-center gap-4 border-b-[1px] border-gray-300
               px-4 py-3"
            >
              <div className="w-24 h-10 rounded-md">
                <SkeletonLoader />
              </div>
              <div className="w-24 h-10 rounded-md">
                <SkeletonLoader />
              </div>
            </div>
          </div>
        </div>
        {notifications.map((_, index) => (
          <div
            className={`flex items-center justify-between gap-4
             relative py-4 px-4 md:px-8 cursor-pointer border-b-[1px]
             border-gray-300 hover:bg-gray-200 w-full`}
            key={index}
          >
            <span
              className="cursor-pointer hidden sm:block
              bg-gray-300 p-1 w-10 h-10 rounded-[50%]"
            ></span>
            <div className="w-[40vw]s sm:w-[3/5]s flex-1 h-10 rounded-md">
              <SkeletonLoader />
            </div>
            <div className="w-16 sm:w-28 h-10 rounded-md">
              <SkeletonLoader />
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
