import React, { Fragment, ChangeEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../shared/UI/InputField";
import { InputSelect } from "../../shared/UI/InputSelect";
import { updateProfile } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import { TAuthState } from "../../types/auth";

type TUpdateUser = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  accessToken: string;
};

export const UpdateProfile: React.FC = () => {
  const dispatch: any = useDispatch();

  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response: any) => {
      dispatch(
        showCardNotification({
          type: "success",
          message: response.message,
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

  const initialValues: TUpdateUser = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    accessToken: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("first name is required"),
      lastName: Yup.string().max(255).required("last name is required"),
      email: Yup.string().max(255).required("email is required"),
      gender: Yup.string().max(255).required("gender is required"),
      phoneNumber: Yup.string().max(255).required("phone number is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        mutate({
          userId: userId,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
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

  const gender = ["--select-gender--", "male", "female"];

  const genderChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const genderValue = event.target.value;
    if (genderValue === "--select-gender--") return;

    formik.values.gender = genderValue;
  };

  return (
    <Fragment>
      <div className="min-h-screen grid place-items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-[480px]
          bg-blue-500s shadow-2xl p-8 rounded-2xl"
        >
          <p className="text-start w-full text-lg font-semibold text-gray-800">
            Update profile
          </p>
          <InputField
            type="text"
            label="First name"
            name="firstName"
            formik={formik}
          />
          <InputField
            type="text"
            label="Last name"
            name="lastName"
            formik={formik}
          />
          <InputField type="email" label="Email" name="email" formik={formik} />
          <InputField
            type="text"
            label="Phone number"
            name="phoneNumber"
            formik={formik}
          />
          <InputSelect
            label="Gender"
            name="gender"
            onChange={genderChangeHandler}
            options={gender}
            formik={formik}
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            formik={formik}
          />
          {!isLoading && (
            <Button
              label="Update"
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
        </form>
      </div>
    </Fragment>
  );
};
