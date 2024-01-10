import React, { Fragment, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
// import { DoctorDashboard } from "../patient/pages/DoctorDashboard";
import { PatientDashboard } from "../doctor/pages/PatientDashboard";
import { DashLayout } from "../shared/layout/DashLayout";

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
    title: "Doctor",
    pages: [
      {
        name: "PatientDashboard",
        icon: "icon",
        path: "/",
        element: <PatientDashboard />,
      },
    ],
  };

  //TODO: check for role("patient")

  return (
    <Fragment>
      <Routes>
        {routes.pages.map((page, index) => (
          <Route key={index} path={page.path} element={page.element} />
        ))}
      </Routes>
      <DashLayout routes={routes}>
        <Routes>
          {routes.pages.map((page, index) => (
            <Route key={index} path={page.path} element={page.element} />
          ))}
        </Routes>
      </DashLayout>
    </Fragment>
  );
};
