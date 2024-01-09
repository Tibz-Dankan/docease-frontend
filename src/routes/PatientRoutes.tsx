import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { DoctorDashboard } from "../patient/pages/DoctorDashboard";

export const PatientRoutes: React.FC = () => {
  const routes = [
    {
      element: <DoctorDashboard />,
      path: "/",
    },
  ];

  //TODO: check for role("patient")

  return (
    <Fragment>
      <div>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Fragment>
  );
};
