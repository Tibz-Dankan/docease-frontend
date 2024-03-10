import React, { Fragment, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { SignUpPatient } from "../auth/UI/SignUpPatient";
import { SignUpDoctor } from "../auth/UI/SignUpDoctor";
import { SignIn } from "../auth/UI/SignIn";
import { SignInDoctor } from "../auth/UI/SignInDoctor";
import { SignInPatient } from "../auth/UI/SignInPatient";
import { ForgotPassword } from "../auth/UI/ForgotPassword";
import { ResetPassword } from "../auth/UI/ResetPassword";
import { VerifyTwoFAToken } from "../auth/UI/VerifyTwoFAToken";

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

export const AuthRoutes: React.FC = () => {
  const routes: TRoute = {
    title: "auth",
    pages: [
      {
        name: "Sign up",
        icon: "icon",
        path: "patient/signup",
        element: <SignUpPatient />,
      },
      {
        name: "Sign up",
        icon: "icon",
        path: "doctor/signup",
        element: <SignUpDoctor />,
      },
      {
        name: "Sign In Patient",
        icon: "icon",
        path: "patient/signin",
        element: <SignInPatient />,
      },
      {
        name: "Sign In Doctor",
        icon: "icon",
        path: "doctor/signin",
        element: <SignInDoctor />,
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
        path: "/reset-password/:resetToken",
        element: <ResetPassword />,
      },
      {
        name: "Verify 2FA",
        icon: "icon",
        path: "/2fa-verification",
        element: <VerifyTwoFAToken />,
      },
    ],
  };

  return (
    <Fragment>
      <div>
        <Routes>
          {routes.pages.map((page, index) => (
            <Route key={index} path={page.path} element={page.element} />
          ))}
        </Routes>
      </div>
    </Fragment>
  );
};
