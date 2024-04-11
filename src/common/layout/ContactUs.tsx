import { useMutation } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { sendContactMessage } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "../../shared/UI/InputField";
import { InputTextArea } from "../../shared/UI/InputTextArea";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";

type TContactMessage = {
  name: string;
  email: string;
  message: string;
};

export const ContactUs: React.FC = () => {
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: (response: any) => {
      formik.values.name = "";
      formik.values.email = "";
      formik.values.message = "";
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      return;
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TContactMessage = {
    name: "",
    email: "",
    message: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("name is required"),
      email: Yup.string().max(255).required("email is required"),
      message: Yup.string().max(255).required("message is required"),
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
        className="w-full flex flex-col justify-start gap-8
        lg:gap-0 md:flex-row px-4 sm:px-16 lg:px-28 py-24 -mt-8 
        md:items-start md:justify-center text-gray-800 bg-primaryLight
        sm:bg-gradient-to-tr from-gray-200 via-blue-100 to-blue-200"
      >
        <div className="w-full lg:w-1/2 text-gray-800">
          <p className="text-3xl mb-8">Contact Us</p>
          <p className="text-gray-600">Communicate with our Administrators</p>
          <p className="text-gray-600">Tell us what's on your mind.</p>
          <p className="text-primary flex items-center text-lg mt-8">
            <span>Contact us via email</span>
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
              ></path>
            </svg>
          </p>
        </div>

        <form
          className="flex flex-col gap-2 items-center w-full 
          md:w-[480px] p-8 bg-gray-50 rounded-md shadow-md"
          onSubmit={formik.handleSubmit}
        >
          <p className="text-2xl text-gray-800">Send us a message</p>
          <InputField
            type="text"
            label="Your name"
            name="name"
            formik={formik}
          />
          <InputField
            type="email"
            label="Your email"
            name="email"
            formik={formik}
          />
          <InputTextArea
            label="Your message"
            name="message"
            formik={formik}
            className="h-24"
          />
          {!isLoading && (
            <Button
              label="Send"
              type="submit"
              aria-disabled={isLoading}
              className="font-semibold mt-4"
            />
          )}
          {isLoading && (
            <div
              className="bg-primary text-gray-50 flex items-center
              justify-center p-1 w-full rounded mt-4"
            >
              <Loader className="w-8 h-8" />
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
};
