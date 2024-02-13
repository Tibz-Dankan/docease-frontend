import { openSidebarHandler } from "../../store/actions/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { PiChatsCircleLight } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { IconContext } from "react-icons";
import { SearchApp } from "../UI/SearchApp";
import { NavDropdown } from "../UI/NavDropdown";
import logo from "../../assets/images/logo.jpeg";
import { TAuthState } from "../../types/auth";
import { Link } from "react-router-dom";
import {
  TLiveNotification,
  TLiveNotificationState,
} from "../../types/liveNotification";
import { useEffect, useState } from "react";

export const DashboardHeader = () => {
  const dispatch: any = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebarHandler());
  };

  const userRole = useSelector((state: TAuthState) => state.auth.user?.role);

  const notifications: TLiveNotification[] = useSelector(
    (state: TLiveNotificationState) => state.liveNotification.notifications
  );
  const [notificationCount, setNotificationCount] = useState<number | string>(
    notifications?.length
  );

  // TODO: to animate notification count
  // TODO(maybe): to implement notification count

  useEffect(() => {
    const notificationCountStrBuilder = () => {
      const notifyCount: number = notifications?.length;
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
      className="transition-all fixed w-full top-0 left-0
       z-40 py-3 h-16 bg-primary px-4"
    >
      <div
        className="flex flex-col-reverses justify-between 
         gap-4 sm:gap-6 md:flex-row md:items-center"
      >
        <div
          className="flex items-center gap-0 relative 
          w-12 sm:w-64"
        >
          <img
            src={logo}
            alt="logo"
            className="w-12 absolute top-0 sm:-top-1 left-0 fill-white"
          />
          <span
            className="text-gray-50 ml-11 text-2xl uppercase
            font-semibold hidden sm:block"
          >
            Docease
          </span>
        </div>

        <div
          className="flex items-center justify-center absolute top-20 
           left-0 sm:static w-full"
        >
          <SearchApp />
        </div>

        <div className="flex items-center gap-4">
          <span
            onClick={() => handleOpenSidebar()}
            className="inline-block xl:hidden cursor-pointer"
          >
            <IconContext.Provider value={{ size: "1.8rem", color: "#fff" }}>
              <IoIosMenu />
            </IconContext.Provider>
          </span>
          <Link to={`/${userRole}/messages`}>
            <IconContext.Provider value={{ size: "1.8rem", color: "#fff" }}>
              <PiChatsCircleLight />
            </IconContext.Provider>
          </Link>
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
            <IconContext.Provider value={{ size: "1.8rem", color: "#fff" }}>
              <IoMdNotificationsOutline />
            </IconContext.Provider>
          </Link>
          <NavDropdown>
            <div className="flex items-center">
              <span
                className="cursor-pointer grid place-items-center  bg-gray-300 p-1
              w-10 h-10 rounded-[50%]"
              >
                <IconContext.Provider
                  value={{ size: "1.4rem", color: "#495057" }}
                >
                  <IoPerson />
                </IconContext.Provider>
              </span>
              <span className="inline-block cursor-pointer">
                <IconContext.Provider value={{ size: "1.2rem", color: "#fff" }}>
                  <GoTriangleDown />
                </IconContext.Provider>
              </span>
            </div>
          </NavDropdown>
        </div>
      </div>
    </header>
  );
};
