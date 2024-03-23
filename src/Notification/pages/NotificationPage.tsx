import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
  updateServerNotifications,
} from "../../store/actions/notification";
import { Loader } from "../../shared/UI/Loader";
import { getNotificationsByUser } from "../API";
import { NotificationList } from "../layout/NotificationList";

export const NotificationPage: React.FC = () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;
  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;
  const dispatch: any = useDispatch();

  const { isLoading } = useQuery({
    queryKey: [`notifications-${userId}`],
    queryFn: () =>
      getNotificationsByUser({ userId: userId, accessToken: accessToken }),
    onSuccess: (response: any) => {
      dispatch(updateServerNotifications(response?.data?.notifications));
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;
  }

  // console.log("notification server response==>", data);

  // // const notifications = data?.data?.notifications as TServerNotification[];
  // const notifications = useSelector(
  //   (state: TNotificationState) => state.notification.notifications
  // );

  // const unReadNotificationCount = (): number => {
  //   const unReadNotifications = notifications?.filter(
  //     (notification) => notification.isRead === false
  //   );
  //   return unReadNotifications?.length;
  // };

  // get notifications from redux store here

  return (
    <Fragment>
      {/* <div className="bg-gray-50 p-4 px-2 rounded-md shadow-md">
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
      </div> */}
      <div>
        <NotificationList />
      </div>
    </Fragment>
  );
};
