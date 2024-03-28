import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TNotificationState,
  TServerNotification,
} from "../../types/notification";
import { IconContext } from "react-icons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NotificationItem } from "../UI/NotificationItem";

export const NotificationList: React.FC = () => {
  const theNotifications = useSelector(
    (state: TNotificationState) => state.notification.notifications
  );

  const [notifications, setNotifications] = useState(theNotifications);

  const unReadNotificationCount = (): number => {
    const unReadNotifications: TServerNotification[] = notifications?.filter(
      (notification) => notification.isRead === false
    );
    return unReadNotifications?.length;
  };

  useEffect(() => {
    const updateNotifications = () => {
      setNotifications(() => theNotifications);
    };
    updateNotifications();
  }, [theNotifications]);

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
            <span className="text-xl text-gray-800s text-primary">
              Notifications
            </span>
          </div>
          <div>
            <div
              className="text-gray-800 flex items-center 
               justify-center gap-4 border-b-[1px] border-gray-300
               px-4 py-3"
            >
              <p>
                <span className="mr-2">Total:</span>
                <span>{notifications?.length}</span>
              </p>
              <p>
                <span className="mr-2">Unread:</span>
                <span>{unReadNotificationCount()}</span>
              </p>
            </div>
          </div>
        </div>
        {notifications?.map((notification, index) => (
          <div key={index}>
            <NotificationItem notification={notification} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
