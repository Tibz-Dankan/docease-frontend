import React, { Fragment, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "../auth/UI/SignUp";
import { SignIn } from "../auth/UI/SignIn";
import { ForgotPassword } from "../auth/UI/ForgotPassword";
import { ResetPassword } from "../auth/UI/ResetPassword";

interface Page {
  name: string;
  icon: ReactNode;
  path: string;
  element: ReactNode;
}

interface Route {
  title: string;
  pages: Page[];
}

export const AuthRoutes: React.FC = () => {
  const routes: Route[] = {
    title: "auth",
    pages: [
      {
        name: "Sign up",
        icon: "icon",
        path: "/signup",
        element: <SignUp />,
      },
      {
        name: "Sign up",
        icon: "icon",
        path: "/signin",
        element: <SignIn />,
      },
      {
        name: "Sign up",
        icon: "icon",
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        name: "Sign up",
        icon: "icon",
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  };

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
