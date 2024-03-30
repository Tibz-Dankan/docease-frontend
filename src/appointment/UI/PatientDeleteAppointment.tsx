import React, { Fragment, useState } from "react";
import { Button } from "../../shared/UI/Button";

import { AppDate } from "../../utils/appDate";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteAppointment } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { TAppointment } from "../../types/appointments";
import { onCloseModal } from "../../store/actions/modal";

interface PatientDeleteAppointmentProps {
  appointment: TAppointment;
  onDelete: (appointmentId: string) => void;
}

export const PatientDeleteAppointment: React.FC<
  PatientDeleteAppointmentProps
> = (props) => {
  const appointment = props.appointment;

  const appointmentStartTime = new AppDate(appointment.startsAt).time();
  const appointmentEndTime = new AppDate(appointment.endsAt).time();
  const doctorName = `${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`;

  const weekDay = new AppDate(appointment.endsAt).weekday();
  const dayMonthYear = new AppDate(appointment.endsAt).dayMonthYear();
  const appointmentDate = `${weekDay}, ${dayMonthYear}`;

  const auth = useSelector((state: TAuthState) => state.auth);
  const dispatch: any = useDispatch();

  const [hasConfirmedDelete, setHasConfirmedDelete] = useState(false);

  const cancelAppointmentDeleteHandler = () => {
    setHasConfirmedDelete(() => false);
    dispatch(onCloseModal());
  };

  const approveAppointmentDeleteHandler = () => {
    setHasConfirmedDelete(() => true);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: (response: any) => {
      console.log("response--->", response);
      props.onDelete(appointment.appointmentId);
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

  const appointmentEditHandler = () => {
    const appointmentId = appointment.appointmentId;
    const accessToken = auth.accessToken as string;

    if (!appointmentId) {
      dispatch(
        showCardNotification({
          type: "error",
          message: "Please provide appointmentId!",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    }

    mutate({
      appointmentId: appointmentId,
      token: accessToken,
    });
  };

  return (
    <Fragment>
      <div
        className="p-4 sm:p-8 w-full flex-col gap-4 text-gray-800 
         space-y-4"
      >
        <div
          className="w-full flex items-center justify-center
          border-b-[1px] border-gray-300 pb-4"
        >
          <p className="text-red-800 text-xl text-center">Delete Appointment</p>
        </div>
        <div>
          <p>
            <span className="text-lg italics mr-2 font-semibold">Note:</span>
            <span className="">
              Please note that you can't delete an appointment that has been
              approved by the doctor.
            </span>
          </p>
        </div>
        {!hasConfirmedDelete && (
          <div className="flex flex-col gap-4">
            <p
              className="space-x-2 border-b-[1px] border-gray-300
              pb-4"
            >
              <span>
                Are you sure that you want to delete an appointment on schedule
                on
              </span>
              <span className="font-semibold">
                {appointmentDate}, {appointmentStartTime} - {appointmentEndTime}
              </span>
              <span>with</span>
              <span className="font-semibold">{"Dr. " + doctorName}?</span>
            </p>
            <div className="flex items-center justify-between gap-4 mt-2">
              <Button
                label="NO"
                type="button"
                onClick={() => cancelAppointmentDeleteHandler()}
                className="bg-gray-300 text-gray-800"
              />
              <Button
                label="YES"
                type="button"
                onClick={() => approveAppointmentDeleteHandler()}
                className="bg-gray-300 text-red-500"
              />
            </div>
          </div>
        )}
        {hasConfirmedDelete && (
          <div className="flex flex-col gap-4  ">
            <p
              className="space-x-2 border-b-[1px] border-gray-300
              pb-4"
            >
              <span>You are deleting an appointment on schedule on</span>
              <span className="font-semibold">
                {appointmentDate}, {appointmentStartTime} - {appointmentEndTime}
              </span>
              <span>with</span>
              <span className="font-semibold">{"Dr. " + doctorName}.</span>
            </p>
            <div className="mt-2">
              {!isLoading && (
                <Button
                  label="Delete"
                  type="button"
                  onClick={() => appointmentEditHandler()}
                  className="bg-gray-300 text-red-500"
                />
              )}
              {isLoading && (
                <div
                  className="bg-gray-300 text-red-500 flex 
                items-center justify-center p-1 w-full rounded"
                >
                  <Loader className="w-8 h-8 stroke-red-500" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
