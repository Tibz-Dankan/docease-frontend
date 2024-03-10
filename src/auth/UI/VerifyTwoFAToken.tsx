import React, { Fragment } from "react";
import { useFormik } from "formik";
// import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../shared/UI/InputField";
import { verifyTwoFAToken } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import logo from "../../assets/images/logo.jpeg";
import { authenticate } from "../../store/actions/auth";

type TTWoFAToken = {
  token: string;
};

export const VerifyTwoFAToken: React.FC = () => {
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: verifyTwoFAToken,
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

  const initialValues: TTWoFAToken = {
    token: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      token: Yup.string().max(255).required("Verification token is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        const token = values.token;
        mutate({ twoFAToken: token.toString() });
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
          bg-blue-500s shadow-2xl p-8 rounded-2xl text-gray-800"
        >
          <img src={logo} alt="logo" className="w-28" />
          <p className="text-start text-2xl font-semibold">
            We need some security information
          </p>
          <p className="text-center font-semibold my-2">Account Verification</p>
          <p className="">
            If we patterns that seem unusual for your account, we will need to
            verify your identity
          </p>
          <InputField
            type="number"
            label="Enter Verification Code"
            name="token"
            formik={formik}
          />
          {!isLoading && (
            <Button
              label="Verify"
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
          {/* <div className="mt-4 space-y-4">
            <p className="hover:underline hover:text-blue-500 cursor-pointer">
              Didn't receive a code?{" "}
              <Link to="/auth/resend" className="underline">
                Resend
              </Link>
            </p>
          </div> */}
        </form>
      </div>
    </Fragment>
  );
};
