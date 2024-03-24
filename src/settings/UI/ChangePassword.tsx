import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { updatePassword } from "../API";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "../../shared/UI/InputField";

type TPasswords = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const ChangePassword: React.FC = () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;
  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (response: any) => {
      dispatch(
        showCardNotification({ type: "success", message: response.message })
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

  const initialValues: TPasswords = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .max(255)
        .required("Current password is required"),
      newPassword: Yup.string().max(255).required("New password is required"),
      confirmNewPassword: Yup.string()
        .max(255)
        .required("Confirm password is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        if (!values.currentPassword || !values.newPassword) {
          console.log("form has errors");
          return;
        }
        if (values.newPassword !== values.confirmNewPassword) {
          formik.errors.confirmNewPassword = "Passwords don't much!";
          dispatch(
            showCardNotification({
              type: "error",
              message: "Please check form for errors",
            })
          );
          setTimeout(() => {
            dispatch(hideCardNotification());
          }, 5000);

          return;
        }
        mutate({
          userId: userId,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          accessToken: accessToken,
        });
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
    <div
      className="w-full h-fulls grid place-items-center"
      id="change-password"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-[480px] space-y-4s bg-white
        rounded-md shadow-md p-8"
      >
        <p
          className="text-gray-700 text-xl font-semibold
            text-center"
        >
          Change your password
        </p>
        <InputField
          type="password"
          label="Current Password"
          name="currentPassword"
          formik={formik}
        />
        <InputField
          type="password"
          label="New Password"
          name="newPassword"
          formik={formik}
        />
        <InputField
          type="password"
          label="Confirm New Password"
          name="confirmNewPassword"
          formik={formik}
        />
        <div className="flex items-center justify-start pt-6">
          {!isLoading && <Button label="Change" type="submit" />}
          {isLoading && <Loader />}
        </div>
      </form>
    </div>
  );
};
