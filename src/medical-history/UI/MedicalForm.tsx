import React, { Fragment } from "react";
import { Modal } from "../../shared/UI/Modal";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { postMedicalRecord } from "../API";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputTextArea } from "../../shared/UI/InputTextArea";
import { TMedication } from "../../types/medication";
import { TAuthState } from "../../types/auth";

export const MedicalForm: React.FC = () => {
  const dispatch: any = useDispatch();
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;
  const user = useSelector((state: TAuthState) => state.auth.user);

  const { isLoading, mutate } = useMutation({
    mutationFn: postMedicalRecord,
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
      clearForm();
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TMedication = {
    healthStatus: "",
    medication: "",
    illness: "",
    diet: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      healthStatus: Yup.string().max(255).required("This field is required"),
      medication: Yup.string().max(255).required("This field is required"),
      illness: Yup.string().max(255).required("This field is required"),
      diet: Yup.string().max(255).required("This field is required"),
    }),

    onSubmit: async (values, helpers) => {
      console.log("Values=>", values);
      try {
        mutate({
          healthStatus: values.healthStatus,
          medication: values.medication,
          illness: values.illness,
          diet: values.diet,
          userId: user?.userId!,
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

  const clearForm = () => {
    formik.values = initialValues;
  };

  return (
    <Fragment>
      <Modal
        openModalElement={
          <Button label="Fill Form" type="button" className="px-4" />
        }
        className=""
      >
        <div className="flex items-center justify-center p-7">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-0 items-center w-[90%] sm:w-[480px]
             text-gray-800 h-[70vh] overflow-x-hidden mb-4 p-1"
          >
            <p className="w-full font-semibold text-primary text-lg">
              Medical Form
            </p>
            <InputTextArea
              label="What is your current health status?"
              name="healthStatus"
              formik={formik}
            />
            <InputTextArea
              label="Have you experienced any significant illness,
              surgeries, or medical condition in the past? 
              Please provide details if possible."
              name="illness"
              formik={formik}
            />
            <InputTextArea
              label="Are you currently taking any medication, 
              including prescriptions, over the counter-drugs or supplements?
              If yes, please list them."
              name="medication"
              formik={formik}
            />
            <InputTextArea
              label="What is your typical daily diet like? Do you 
              follow any specific dietary restrictions or preferences"
              name="diet"
              formik={formik}
            />

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
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};
