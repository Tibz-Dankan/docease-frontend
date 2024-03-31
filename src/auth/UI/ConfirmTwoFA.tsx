import React, { Fragment } from "react";
import { Button } from "../../shared/UI/Button";

import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { confirmTwoFA } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { Modal } from "../../shared/UI/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "../../shared/UI/InputField";
import { ResendEnableTwo } from "./ResendEnableTwo";
import { authenticate } from "../../store/actions/auth";

type TConfirmTwoFAToken = {
  token: string;
};

export const ConfirmTwoFA: React.FC = () => {
  const auth = useSelector((state: TAuthState) => state.auth);
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: confirmTwoFA,
    onSuccess: (response: any) => {
      auth.user!.twoFA = response?.data.twoFA;
      dispatch(authenticate(auth));
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

  const initialValues: TConfirmTwoFAToken = {
    token: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      token: Yup.string().max(255).required("Confirmation token is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        const token = values.token;
        const accessToken = auth.accessToken as string;

        mutate({ token: token.toString(), accessToken: accessToken });
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
        className="full border-[1px] border-gray-300 rounded-md 
         p-4 relative h-40 text-gray-800"
      >
        <p>Please confirm Two Factor Authentication to secure your account</p>
        <div
          className="w-full flex items-center justify-end
           absolute bottom-3 right-0"
        >
          <ResendEnableTwo />
        </div>

        <Modal
          openModalElement={
            <Button
              label="Confirm 2FA"
              type="button"
              className="bg-primary text-white absolute 
              bottom-16 right-4 w-28"
            />
          }
          className=""
        >
          <div
            className="p-8  w-[90%] sm:w-[400px] h-[90vh]
          md:h-auto flex-col gap-4 text-gray-800 
          space-y-4"
          >
            <div
              className="w-full flex items-center justify-center
            border-b-[1px] border-gray-300 pb-4"
            >
              <p className="text-primary text-xl text-center">Confirm 2FA</p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="space-x-2 text-center">
                <span>
                  Provide token sent to either telephone number or email to
                  complete setting up{" "}
                  <span className="font-semibold">
                    Two(2) Factor Authentication
                  </span>{" "}
                  for your account
                </span>
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-0 items-center"
              >
                <InputField
                  type="number"
                  label="Enter Confirmation Code"
                  name="token"
                  formik={formik}
                />
                <div className="mt-6 w-full">
                  {!isLoading && (
                    <Button
                      label="Confirm"
                      type="submit"
                      className="bg-primary text-white w-full"
                    />
                  )}
                  {isLoading && (
                    <div
                      className="bg-primary text-primary flex 
                      items-center justify-center p-1 w-full rounded"
                    >
                      <Loader className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};
