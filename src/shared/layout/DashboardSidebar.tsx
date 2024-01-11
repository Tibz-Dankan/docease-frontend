import React, { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { closeSidebarHandler } from "../../store/actions/sidebar";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/logo.jpeg";
import { TSidebarState } from "../../types/sidebar";

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

  const sidenavType = "dark";
  const dispatch: any = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebarHandler());
  };

  const title = props.routes.title;
  const pages = props.routes.pages;

  return (
    <aside
      className={`bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 
       fixed inset-0 top-16 z-50 h-[calc(100vh-32px)]s h-[100vh] w-72
       transition-transform duration-300 xl:translate-x-0
       ${isOpenSidebar ? "translate-x-0" : "-translate-x-80"}
      `}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar
            src={logo}
            size="sm"
            className="h-auto w-16"
            placeholder={""}
          />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            placeholder={""}
          >
            Docease
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => handleCloseSidebar()}
          placeholder={""}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {title && (
            <li className="mx-3.5 mt-4 mb-2">
              <Typography
                variant="small"
                color={sidenavType === "dark" ? "white" : "blue-gray"}
                className="font-black uppercase opacity-75"
                placeholder={""}
              >
                {title}
              </Typography>
            </li>
          )}
          {pages.map(({ icon, name, path }) => (
            <li key={name}>
              <NavLink to={`/${title}/${path}`}>
                {({ isActive }) => (
                  <Button
                    className={`flex items-center gap-4 bg-inherit px-4 
                      capitalize text-gray-100 shadow-none hover:bg-blue-gray-700
                      hover:shadow-none ${isActive && "bg-blue-gray-700"}`}
                    fullWidth
                    placeholder={""}
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
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
      </div>
    </aside>
  );
};
