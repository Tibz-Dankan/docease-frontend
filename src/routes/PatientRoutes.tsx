import React, { Fragment, ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { PatientDashboard } from "../patient/pages/PatientDashboard";
import { DashboardLayout } from "../shared/layout/DashboardLayout";
import { NotificationsPage } from "../shared/pages/NotificationsPage";
import { Messages } from "../shared/pages/Messages";
import { PatientAppointments } from "../patient/pages/PatientAppointments";
import { PatientMedicalFiles } from "../medical-history/pages/PatientMedicalFiles";
import { PatientMedicalForm } from "../medical-history/pages/PatientMedicalForm";
import { Settings } from "../settings/Pages/Settings";
import { MentalHealth } from "../mental-health/Pages/MentalHealth";
import { IconContext } from "react-icons";
import { SlSettings } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiChatsCircleLight } from "react-icons/pi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { GoHistory } from "react-icons/go";
import { LiaBrainSolid } from "react-icons/lia";
import { VideoConferencePage } from "../video-conference/pages/VideoConferencePage";
import { Socket } from "socket.io-client";

type TChildPath = {
  path: string;
  element: ReactNode;
};

type TPage = {
  name: string;
  icon: ReactNode;
  path: string;
  element: ReactNode;
  childrenPath?: TChildPath[];
};

type TRoute = {
  title: string;
  pages: TPage[];
};

interface PatientRoutesProps {
  socket: Socket;
}

export const PatientRoutes: React.FC<PatientRoutesProps> = (props) => {
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
        name: "Medical History",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.5rem", color: "#42968D" }}>
              <GoHistory />
            </IconContext.Provider>
          </span>
        ),
        path: "medical-history",
        element: (
          <div className="w-full">
            <Outlet />
          </div>
        ),
        childrenPath: [
          {
            path: "",
            element: <PatientMedicalFiles />,
          },
          {
            path: "files",
            element: <PatientMedicalFiles />,
          },
          {
            path: "form",
            element: <PatientMedicalForm />,
          },
        ],
      },
      {
        name: "Mental health",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.8rem", color: "#42968D" }}>
              <LiaBrainSolid />
            </IconContext.Provider>
          </span>
        ),
        path: "mental-health",
        element: <MentalHealth />,
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
      {
        name: "Video Call",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.5rem", color: "#42968D" }}>
              <SlSettings />
            </IconContext.Provider>
          </span>
        ),
        path: "video-conferencing",
        element: <VideoConferencePage socket={props.socket} />,
      },
    ],
  };

  return (
    <Fragment>
      <DashboardLayout routes={routes}>
        <Routes>
          {routes.pages.map((page, index) => {
            if (page.childrenPath) {
              return (
                <Route key={index} path={page.path} element={page.element}>
                  {page.childrenPath.map((child, index) => (
                    <Route
                      key={index}
                      path={child.path}
                      element={child.element}
                    />
                  ))}
                </Route>
              );
            }
            return (
              <Route key={index} path={page.path} element={page.element} />
            );
          })}
        </Routes>
      </DashboardLayout>
    </Fragment>
  );
};
