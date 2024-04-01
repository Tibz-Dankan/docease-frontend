import { openSidebarHandler } from "../../store/actions/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { IconContext } from "react-icons";
import { NavDropdown } from "../UI/NavDropdown";
import { TAuthState } from "../../types/auth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Image } from "../UI/Image";
import {
  TNotificationState,
  TServerNotification,
} from "../../types/notification";
import { UserOnlineStatus } from "../../onlineStatus/UI/UserOnlineStatus";

export const DashboardHeader = () => {
  const dispatch: any = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebarHandler());
  };

  const user = useSelector((state: TAuthState) => state.auth.user!);
  const userRole = user.role;
  const username = `${user.firstName} ${user.lastName}`;

  const notifications = useSelector(
    (state: TNotificationState) => state.notification.notifications
  );

  const unReadNotificationCount = (): number => {
    const unReadNotifications: TServerNotification[] = notifications?.filter(
      (notification) => notification.isRead === false
    );
    return unReadNotifications?.length;
  };
  const [notificationCount, setNotificationCount] = useState<number | string>(
    unReadNotificationCount()
  );

  // TODO: to animate notification count

  useEffect(() => {
    const notificationCountStrBuilder = () => {
      const notifyCount: number = unReadNotificationCount();
      if (notifyCount > 9 && notifyCount < 99) {
        setNotificationCount(() => "9+");
        return;
      }
      if (notifyCount > 99) {
        setNotificationCount(() => "99+");
        return;
      }
      setNotificationCount(() => notifyCount);
    };

    notificationCountStrBuilder();
  }, [notifications]);

  return (
    <header
      className="transition-all w-full z-[110] py-3 h-16
      bg-gray-100 border-b-[1px] border-gray-300 px-6"
    >
      <div
        className="flex flex-col-reverses justify-between 
         gap-4 sm:gap-6 md:flex-row md:items-center"
      >
        <div className="flex items-center gap-4 w-12 sm:w-64">
          <span
            onClick={() => handleOpenSidebar()}
            className="inline-block xl:hidden cursor-pointer"
          >
            <IconContext.Provider value={{ size: "1.8rem", color: "#343a40" }}>
              <IoIosMenu />
            </IconContext.Provider>
          </span>
          <span className="text-gray-800">
            {/* TO Dynamically get page route name */}
            {/* {"Messages"} */}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to={`/${userRole}/notifications`} className="relative">
            <span
              className="absolute -top-4 -right-1 text-[12px] 
                  font-semibold text-gray-50 bg-red-700 rounded-[50%] 
                  grid place-items-center min-w-6 min-h-6 px-1
                  animate-opacityZeroToFull"
              key={notificationCount}
            >
              {notificationCount}
            </span>
            <IconContext.Provider value={{ size: "1.8rem", color: "#343a40" }}>
              <IoMdNotificationsOutline />
            </IconContext.Provider>
          </Link>
          <NavDropdown>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 relative">
                {user.imageUrl && (
                  <Image
                    src={user.imageUrl!}
                    alt={username}
                    className="w-full h-full rounded-[50%]"
                  />
                )}
                {!user.imageUrl && (
                  <span
                    className="cursor-pointer grid place-items-center  bg-gray-300 p-1
                    w-full h-full rounded-[50%]"
                  >
                    <IconContext.Provider
                      value={{ size: "1.2rem", color: "#495057" }}
                    >
                      <IoPerson />
                    </IconContext.Provider>
                  </span>
                )}
                <div className="absolute -right-[6px] bottom-1 inline-block">
                  <UserOnlineStatus
                    userId={user.userId}
                    updatedAt={user.onlineStatus?.updatedAt!}
                  />
                </div>
              </div>
              <span className="text-gray-800 hidden sm:block">{username}</span>
            </div>
          </NavDropdown>
        </div>
      </div>
    </header>
  );
};
