import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "../auth/UI/SignUp";
import { SignIn } from "../auth/UI/SignIn";
import { ForgotPassword } from "../auth/UI/ForgotPassword";
import { ResetPassword } from "../auth/UI/ResetPassword";

export const AuthRoutes: React.FC = () => {
  const routes = [
    {
      element: <SignUp />,
      path: "/signup",
    },
    {
      element: <SignIn />,
      path: "/signin",
    },
    {
      element: <ForgotPassword />,
      path: "/forgot-password",
    },
    {
      element: <ResetPassword />,
      path: "/reset-password",
    },
  ];

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
