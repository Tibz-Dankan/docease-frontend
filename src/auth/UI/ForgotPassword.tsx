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
import { forgotPassword } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import logo from "../../assets/images/logo.jpeg";
import { SquareDots } from "../../common/UI/SquareDots";

type TInitialValues = {
  email: string;
};

export const ForgotPassword: React.FC = () => {
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res: any) => {
      dispatch(
        showCardNotification({
          type: "success",
          message: res.message,
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TInitialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("email is required"),
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
      <div
        className="min-h-screen grid place-items-center py-28
         relative bg-gray-200"
      >
        <div
          className="bg-blue-100 w-[100vw] h-[60vh] 
          absolute top-0 left-0 right-0 rounded-b-[60%] z-0"
        />
        <SquareDots
          className="absolute bottom-[10vh] left-2 sm:left-6
            xl:left-24 hidden sm:grid grid-cols-5 z-0"
          size={"w-4 h-4"}
          bgColor={""}
          borderColor={"border-blue-100"}
          gap={"gap-3"}
          filled={false}
          applyShadow={false}
        />
        <SquareDots
          className="absolute bottom-[10vh] right-2 sm:right-6
            xl:right-24 hidden sm:grid grid-cols-5 z-0"
          size={"w-4 h-4"}
          bgColor={""}
          borderColor={"border-blue-100"}
          gap={"gap-3"}
          filled={false}
          applyShadow={false}
        />
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-[480px]
          bg-gray-50 shadow-md p-8 rounded-md z-[1]"
        >
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <p className="text-center text-2xl font-semibold text-gray-800">
            Reset Password
          </p>
          <p className="text-start text-sm md:text-base text-gray-700 mt-4">
            Please provide an email associated with your Docease account where
            we will send you a reset token.
          </p>
          <InputField type="email" label="Email" name="email" formik={formik} />
          {!isLoading && (
            <Button
              label="Submit"
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
              <Link to="/auth/signin" className="underline">
                Remember password? Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
