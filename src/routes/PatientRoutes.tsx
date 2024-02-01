import React, { Fragment, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { PatientDashboard } from "../patient/pages/PatientDashboard";
import { DashboardLayout } from "../shared/layout/DashboardLayout";
import { NotificationsPage } from "../shared/pages/NotificationsPage";
import { Messages } from "../shared/pages/Messages";
import { PatientAppointments } from "../patient/pages/PatientAppointments";
import { Settings } from "../settings/Pages/Settings";
import { IconContext } from "react-icons";
import { SlSettings } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiChatsCircleLight } from "react-icons/pi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";

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

export const PatientRoutes: React.FC = () => {
  const routes: TRoute = {
    title: "patient",
    pages: [
      {
        name: "Dashboard",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.8rem", color: "#42968D" }}>
              <AiOutlineDashboard />
            </IconContext.Provider>
          </span>
        ),
        path: "dashboard",
        element: <PatientDashboard />,
      },
      {
        name: "Notifications",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.8rem", color: "#42968D" }}>
              <IoMdNotificationsOutline />
            </IconContext.Provider>
          </span>
        ),
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        name: "Appointments",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.8rem", color: "#42968D" }}>
              <MdOutlineCalendarMonth />
            </IconContext.Provider>
          </span>
        ),
        path: "appointments",
        element: <PatientAppointments />,
      },
      {
        name: "Messages",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.8rem", color: "#42968D" }}>
              <PiChatsCircleLight />
            </IconContext.Provider>
          </span>
        ),
        path: "messages",
        element: <Messages />,
      },
      {
        name: "Settings",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.5rem", color: "#42968D" }}>
              <SlSettings />
            </IconContext.Provider>
          </span>
        ),
        path: "settings",
        element: <Settings />,
      },
    ],
  };

  //TODO: check for role("patient")

  return (
    <Fragment>
      <DashboardLayout routes={routes}>
        <Routes>
          {routes.pages.map((page, index) => (
            <Route key={index} path={page.path} element={page.element} />
          ))}
        </Routes>
      </DashboardLayout>
    </Fragment>
  );
};
