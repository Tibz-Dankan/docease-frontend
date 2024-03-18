import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../shared/UI/InputField";
import { updateProfile } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import { TAuthState } from "../../types/auth";
import { GenderSelect } from "../../auth/UI/GenderSelect";

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
  const user = useSelector((state: TAuthState) => state.auth.user!);
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
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender!,
    phoneNumber: user.phoneNumber,
    accessToken: accessToken,
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

  const genderSelectHandler = (gender: string) => {
    formik.values.gender = gender;
  };

  return (
    <Fragment>
      <div className="w-full grid place-items-center" id="update-profile">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-full 
           md:w-[480px] bg-white shadow-md p-8 rounded-md"
        >
          <p
            className="text-gray-700 text-xl font-semibold
            text-center"
          >
            Update your profile
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
          <div className="w-full mt-6">
            <GenderSelect
              onSelect={genderSelectHandler}
              defaultGender={formik.values.gender}
            />
          </div>
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
