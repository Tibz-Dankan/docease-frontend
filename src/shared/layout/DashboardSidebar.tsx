import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { closeSidebarHandler } from "../../store/actions/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { TSidebarState } from "../../types/sidebar";
import doctorIcon from "../../assets/icons/doctor-icon.svg";
import patientIcon from "../../assets/icons/patient-icon.svg";
import adminIcon from "../../assets/icons/admin-icon.svg";

import { TAuthState } from "../../types/auth";

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

const UserRoleIcon: React.FC<{ role: string }> = (props) => {
  const role = props.role;

  if (role === "patient") {
    return (
      <svg className="w-8 h-8 fill-primary">
        <use href={`${patientIcon}#patient`}></use>
      </svg>
    );
  }
  if (role === "doctor") {
    return (
      <svg className="w-8 h-8 fill-primary">
        <use href={`${doctorIcon}#doctor`}></use>
      </svg>
    );
  }
  if (role === "admin") {
    return (
      <svg className="w-8 h-8 fill-primary">
        <use href={`${adminIcon}#admin`}></use>
      </svg>
    );
  }
};

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

  const userRole = useSelector(
    (state: TAuthState) => state.auth.user?.role
  ) as string;

  return (
    <aside
      className={`bg-gradient-to-br from-blue-gray-800s to-blue-gray-900s bg-gray-200
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
            <li
              className="bg-gray-300 flex items-center justify-center
               mt-4 rounded-md p-2 py-4 gap-4"
            >
              <span className="flex items-center justify-center">
                <UserRoleIcon role={userRole} />
              </span>
              <span className="text-primary font-semibold text-xl uppercase ">
                {title}
              </span>
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
                      className="font-medium capitalize text-gray-800"
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
