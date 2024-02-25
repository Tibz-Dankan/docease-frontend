import React, { Fragment, ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { DoctorDashboard } from "../doctor/pages/DoctorDashboard";
import { DashboardLayout } from "../shared/layout/DashboardLayout";
import { NotificationsPage } from "../shared/pages/NotificationsPage";
import { DoctorAppointments } from "../doctor/pages/DoctorAppointments";
import { MyPatients } from "../doctor/pages/MyPatients";
import { Settings } from "../settings/Pages/Settings";
import { IconContext } from "react-icons";
import { SlSettings } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
// import { PiChatsCircleLight } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { VideoConferencePage } from "../video-conference/pages/VideoConferencePage";
import { DisplayMedicalHistoryToDoctor } from "../medical-history/pages/DisplayMedicalHistoryToDoctor";

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

export const DoctorRoutes: React.FC = () => {
  const routes: TRoute = {
    title: "doctor",
    pages: [
      {
        name: "Dashboard",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.8rem", color: "#495057" }}>
              <AiOutlineDashboard />
            </IconContext.Provider>
          </span>
        ),
        path: "dashboard",
        element: <DoctorDashboard />,
      },
      {
        name: "My Patients",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.4rem", color: "#495057" }}>
              <RiGroupLine />
            </IconContext.Provider>
          </span>
        ),
        path: "my-patients",
        element: (
          <div className="w-full flex items-center justify-center">
            <Outlet />
          </div>
        ),
        childrenPath: [
          {
            path: "",
            element: <MyPatients />,
          },
          {
            path: "patient-medical-history/:patientId",
            element: <DisplayMedicalHistoryToDoctor />,
          },
          {
            path: "patient-health-assessment/:patientId",
            element: <div>Patient health assessment</div>,
          },
        ],
      },
      {
        name: "Notifications",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.8rem", color: "#495057" }}>
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
            <IconContext.Provider value={{ size: "1.8rem", color: "#495057" }}>
              <MdOutlineCalendarMonth />
            </IconContext.Provider>
          </span>
        ),
        path: "appointments",
        element: <DoctorAppointments />,
      },
      {
        name: "Settings",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.5rem", color: "#495057" }}>
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
            <IconContext.Provider value={{ size: "1.5rem", color: "#495057" }}>
              <SlSettings />
            </IconContext.Provider>
          </span>
        ),
        path: "video-conferencing",
        element: <VideoConferencePage />,
      },
    ],
  };

  return (
    <Fragment>
      <div>
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
      </div>
    </Fragment>
  );
};
