import React, { Fragment } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../shared/UI/InputField";
import { signInDoctor } from "../API";
import { TSigninInPut } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import logo from "../../assets/images/logo.jpeg";
import { authenticate } from "../../store/actions/auth";

export const SignInDoctor: React.FC = () => {
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: signInDoctor,
    onSuccess: (auth: any) => {
      dispatch(authenticate(auth));
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TSigninInPut = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("email is required"),
      password: Yup.string()
        .max(255)
        .min(5)
        .max(30)
        .required("password is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        mutate(values);
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
        dispatch(showCardNotification({ type: "error", message: err.message }));
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      }
    },
  });

  return (
    <Fragment>
      <div className="min-h-screen grid place-items-center py-28">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-[480px]
          bg-blue-500s shadow-2xl p-8 rounded-2xl"
        >
          <img src={logo} alt="logo" className="w-28" />
          <p className="text-center text-2xl font-semibold">Log in as Doctor</p>
          <InputField type="email" label="Email" name="email" formik={formik} />
          <InputField
            type="password"
            label="Password"
            name="password"
            formik={formik}
          />
          {!isLoading && (
            <Button
              label="Log in"
              type="submit"
              aria-disabled={isLoading}
              className="mt-6 font-semibold"
            />
          )}
          {isLoading && (
            <div
              className="bg-primary text-gray-50 flex items-center
              justify-center p-1 w-full rounded mt-6"
            >
              <Loader className="w-8 h-8" />
            </div>
          )}
          <div className="mt-4 space-y-4">
            <p className="text-center hover:underline hover:text-blue-500 cursor-pointer">
              <Link to="/auth/forgot-password">Forgot password?</Link>
            </p>
            <p className="hover:underline hover:text-blue-500 cursor-pointer">
              Don't have an account?{" "}
              <Link to="/auth/doctor/signup" className="underline">
                sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
