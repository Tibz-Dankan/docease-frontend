import { useMutation } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { subscribeToNewsLetter } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { GrSend } from "react-icons/gr";
import { IconContext } from "react-icons";
import bgNewsLetterImg from "../../assets/images/bg-newsletter.jpeg";

type TNewsLetter = {
  email: string;
};

export const NewsLetter: React.FC = () => {
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: subscribeToNewsLetter,
    onSuccess: (response: any) => {
      formik.values.email = "";
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

  const initialValues: TNewsLetter = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("Email address is required"),
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
        className="w-full flex flex-col gap-8 lg:gap-2 md:flex-row px-4 
        sm:px-16 lg:px-28 py-24"
        style={{
          backgroundImage: `linear-gradient(
          to right,
           rgba(24,100,171,0.8),
           rgba(24,100,171,0.8)
           ), url(${bgNewsLetterImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="w-full text-gray-800">
          <p
            className="flex items-center justify-center gap-4
            text-gray-50 text-lg font-semibold italic"
          >
            <span>
              <IconContext.Provider
                value={{
                  size: "1.4rem",
                  color: "#fff",
                }}
              >
                <GrSend />
              </IconContext.Provider>
            </span>
            <span>Subscribe to our NewsLetter</span>
          </p>
        </div>
        <form
          className="w-full flex items-center justify-center"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="email"
            id="email"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values["email"]}
            placeholder="Enter your email address"
            className="p-[9px] px-5 outline-none rounded border-[1px]
             border-gray-50 focus:border-[1px] focus:border-primary
             transition-all text-sm w-full focus:outline-none 
             focus:shadow-[0px_0px_0px_4px_rgba(28,126,214,0.3)]
             text-gray-800 md:w-72 rounded-l-3xl rounded-r-none
             bg-gray-50"
          />
          {!isLoading && (
            <Button
              label="Subscribe"
              type="submit"
              aria-disabled={isLoading}
              className="w-32 rounded-l-none rounded-r-3xl bg-blue-400"
            />
          )}
          {isLoading && (
            <div
              className="bg-blue-400 text-gray-50 flex items-center
              justify-center p-[6px] w-32 rounded-l-none rounded-r-3xl"
            >
              <Loader className="w-7 h-7" />
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
};
