import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { closeSidebarHandler } from "../../store/actions/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { TSidebarState } from "../../types/sidebar";
import logo from "../../assets/images/logo.jpeg";
import { UserRoleBadge } from "../UI/UserRoleBadge";
import { Image } from "../UI/Image";
import { TAuthState } from "../../types/auth";
import { logOut } from "../../store/actions/auth";
import { IoPerson } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

type TPage = {
  name: string;
  icon: ReactNode;
  path: string;
  element: ReactNode;
};

type TRoute = {
  title: string;
  pages: TPage[];
};

interface DashboardSidebarProps {
  routes: TRoute;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const isOpenSidebar = useSelector(
    (state: TSidebarState) => state.sidebar.isOpen
  );

  const dispatch: any = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebarHandler());
  };

  const title = props.routes.title;
  const pages = props.routes.pages;

  const user = useSelector((state: TAuthState) => state.auth.user!);
  const username = `${user.firstName} ${user.lastName}`;

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <aside
      className={`bg-white fixed inset-0 top-0 z-[120] h-[100vh] w-72
       transition-transform duration-300 xl:translate-x-0
       ${isOpenSidebar ? "translate-x-0" : "-translate-x-80"}
       shadow shadow-slate-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2`}
    >
      <div className="relative">
        <span
          onClick={() => handleCloseSidebar()}
          className="cursor-pointer absolute right-4 top-[6px] grid 
           rounded-br-none rounded-tl-none xl:hidden z-20"
        >
          <IconContext.Provider value={{ size: "1.4rem", color: "#495057" }}>
            <IoMdClose />
          </IconContext.Provider>
        </span>
      </div>
      <div
        className="flex items-center justify-start gap-0 relative 
         w-full  h-16 pl-4 border-b-[1px] border-gray-300"
      >
        <img
          src={logo}
          alt="logo"
          className="w-14 absolutes top-0 mt-2 fill-primary"
        />
        <span
          className="text-primaryDark text-2xl uppercase
            font-semibold hidden sm:block"
        >
          Docease
        </span>
      </div>
      <div className="m-4 mt-1">
        <ul className="mb-4 flex flex-col gap-1">
          <UserRoleBadge />
          {pages.map(({ icon, name, path }) => (
            <li key={name}>
              <NavLink
                to={`/${title}/${path}`}
                className={`${path === "video-conferencing" && "hidden"}`}
              >
                {({ isActive }) => (
                  <Button
                    className={`flex items-center gap-4 bg-inherit px-4 
                      capitalize text-gray-800 shadow-none hover:bg-gray-300
                      hover:shadow-none relative outline-none
                    ${
                      isActive &&
                      `bg-gray-300 before:absolute before:left-0 before:top-0 
                       before:h-full before:w-2 before:bg-primary before:rounded-l-md`
                    }`}
                    fullWidth
                    placeholder={""}
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className={`font-medium capitalize ${
                        isActive && "font-semibolds text-gray-800"
                      }`}
                      placeholder={""}
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div
          className="flex items-center justify-start gap-3
           rounded-md p-2 text-white bg-gray-800
          absolute left-4 bottom-4 w-[88%]"
        >
          {user.imageUrl && (
            <Image
              src={user.imageUrl!}
              className="b-gray-300 w-14 h-14 rounded-[50%]"
            />
          )}
          {!user.imageUrl && (
            <span
              className="cursor-pointer grid place-items-center  bg-gray-300 p-1
              w-14 h-14 rounded-[50%] "
            >
              <IconContext.Provider
                value={{ size: "1.8rem", color: "#495057" }}
              >
                <IoPerson />
              </IconContext.Provider>
            </span>
          )}
          <p className="flex flex-col justify-center">
            <span className="text-gray-50">{username}</span>
            <span
              onClick={() => logOutHandler()}
              className="cursor-pointer flex items-center gap-1
              text-gray-400 text-sm"
            >
              <IconContext.Provider
                value={{ size: "1.2rem", color: "#ced4da" }}
              >
                <IoLogOutOutline />
              </IconContext.Provider>
              {"Log out"}
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
};
