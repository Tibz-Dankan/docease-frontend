import React, { Fragment, useState, ChangeEvent } from "react";
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
import { InputSelect } from "../../shared/UI/InputSelect";
import { signUpDoctor } from "../API";
import { TSignupInput } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import logo from "../../assets/images/logo.jpeg";
import { authenticate } from "../../store/actions/auth";

export const SignUpDoctor: React.FC = () => {
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: signUpDoctor,
    onSuccess: (auth: any) => {
      dispatch(authenticate(auth));
      dispatch(
        showCardNotification({
          type: "success",
          message: "Account created successfully",
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

  const initialValues: TSignupInput = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("first name is required"),
      lastName: Yup.string().max(255).required("last name is required"),
      email: Yup.string().max(255).required("email is required"),
      gender: Yup.string().max(255).required("gender is required"),
      phoneNumber: Yup.string().max(255).required("phone number is required"),
      password: Yup.string()
        .min(5)
        .max(30)
        .required("password must have at least 5 characters"),
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

  const [confirmPassword, setConfirmPassword] = useState("");

  const confirmPasswordChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(() => event.target.value);
  };

  const passwordsMatch =
    confirmPassword && confirmPassword !== formik.values.password;

  const gender = ["--select-gender--", "male", "female"];

  const genderChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const genderValue = event.target.value;
    if (genderValue === "--select-gender--") return;

    formik.values.gender = genderValue;
  };

  return (
    <Fragment>
      <div className="min-h-screen grid place-items-center py-28">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-[480px]
          bg-blue-500s shadow-2xl p-8 rounded-2xl"
        >
          <img src={logo} alt="logo" className="w-28" />
          <p className="text-center text-2xl font-semibold">
            Welcome To Docease
          </p>
          <p className="text-center text-sm font-semibold text-primary">
            Create Doctor Account
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
          <div className="inline-block relative w-full">
            {passwordsMatch && (
              <span className="text-sm text-red-500 absolute top-0 left-0">
                Passwords don't much!
              </span>
            )}
            <InputField
              type="password"
              label="Confirm password"
              name="confirmPassword"
              formik={formik}
              onChange={(event: any) => confirmPasswordChangeHandler(event)}
            />
          </div>
          {!isLoading && (
            <Button
              label="Sign up"
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
          <div className="mt-4">
            <p className="hover:underline hover:text-blue-500 cursor-pointer">
              Already have an account?{" "}
              <Link to="/auth/signin" className="underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
