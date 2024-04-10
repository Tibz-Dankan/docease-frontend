import React, { Fragment, ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { PatientDashboard } from "../patient/pages/PatientDashboard";
import { DashboardLayout } from "../shared/layout/DashboardLayout";
import { PatientAppointments } from "../patient/pages/PatientAppointments";
import { PatientMedicalFiles } from "../medical-history/pages/PatientMedicalFiles";
import { PatientMedicalForm } from "../medical-history/pages/PatientMedicalForm";
import { Settings } from "../settings/Pages/Settings";
import { PostMentalHealthAssessmentPage } from "../mental-health/Pages/PostMentalHealthAssessmentPage";
import { IconContext } from "react-icons";
import { SlSettings } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
// import { PiChatsCircleLight } from "react-icons/pi";
// import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { GoHistory } from "react-icons/go";
// import { LiaBrainSolid } from "react-icons/lia";
// import { VideoConferencePage } from "../video-conference/pages/VideoConferencePage";
import { AssessmentHistoryPage } from "../mental-health/Pages/AssessmentHistoryPage";
import { CiCalendarDate } from "react-icons/ci";
import { PiBrainLight } from "react-icons/pi";
import { NotificationPage } from "../Notification/pages/NotificationPage";

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

export const PatientRoutes: React.FC = () => {
  const routes: TRoute = {
    title: "patient",
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
        element: <PatientDashboard />,
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
        element: <NotificationPage />,
      },
      {
        name: "Appointments",
        icon: (
          // <span className="inline-block cursor-pointer">
          //   <IconContext.Provider value={{ size: "1.8rem", color: "#495057" }}>
          //     <MdOutlineCalendarMonth />
          //   </IconContext.Provider>
          // </span>
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "2rem", color: "#495057" }}>
              <CiCalendarDate />
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
            <IconContext.Provider value={{ size: "1.6rem", color: "#495057" }}>
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
      // {
      //   name: "Mental health",
      //   icon: (
      //     <span className="inline-block cursor-pointer">
      //       <IconContext.Provider value={{ size: "1.8rem", color: "#495057" }}>
      //         <LiaBrainSolid />
      //       </IconContext.Provider>
      //     </span>
      //   ),
      //   path: "mental-health",
      //   element: <PostMentalHealthAssessmentPage />,
      // },
      {
        name: "Mental health",
        icon: (
          <span className="inline-block cursor-pointer">
            <IconContext.Provider
              value={{
                size: "1.8rem",
                color: "#495057",
                style: { fontWeight: 100 },
              }}
            >
              <PiBrainLight />
            </IconContext.Provider>
          </span>
        ),
        path: "mental-health/assessment",
        element: (
          <div className="w-full">
            <Outlet />
          </div>
        ),
        childrenPath: [
          {
            path: "",
            element: <PostMentalHealthAssessmentPage />,
          },
          {
            path: "post",
            element: <PostMentalHealthAssessmentPage />,
          },
          {
            path: "history/:mentalHealthId",
            element: <AssessmentHistoryPage />,
          },
        ],
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
      // {
      //   name: "Video Call",
      //   icon: (
      //     <span className="inline-block cursor-pointer">
      //       <IconContext.Provider value={{ size: "1.5rem", color: "#495057" }}>
      //         <SlSettings />
      //       </IconContext.Provider>
      //     </span>
      //   ),
      //   path: "video-conferencing/:videoConferenceId",
      //   element: <VideoConferencePage />,
      // },
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
