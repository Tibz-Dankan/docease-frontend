import React, { Fragment, useState } from "react";
import { Button } from "../../shared/UI/Button";

import { AppDate } from "../../utils/appDate";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { cancelAppointment } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { TAppointment } from "../../types/appointments";
import { onCloseModal } from "../../store/actions/modal";

interface DoctorCancelAppointmentProps {
  appointment: TAppointment;
  onCancel: (appointmentId: string) => void;
}

export const DoctorCancelAppointment: React.FC<DoctorCancelAppointmentProps> = (
  props
) => {
  const appointment = props.appointment;

  const appointmentStartTime = new AppDate(appointment.startsAt).time();
  const appointmentEndTime = new AppDate(appointment.endsAt).time();
  const patientName = `${appointment.patient?.firstName} ${appointment.patient?.lastName}`;

  const weekDay = new AppDate(appointment.endsAt).weekday();
  const dayMonthYear = new AppDate(appointment.endsAt).dayMonthYear();
  const appointmentDate = `${weekDay}, ${dayMonthYear}`;

  const auth = useSelector((state: TAuthState) => state.auth);
  const dispatch: any = useDispatch();

  const [hasConfirmedCancel, setHasConfirmedCancel] = useState(false);
  const [doctorsComment, setDoctorsComment] = useState("");

  const cancelAppointmentDeleteHandler = () => {
    setHasConfirmedCancel(() => false);
    dispatch(onCloseModal());
  };

  const approveAppointmentDeleteHandler = () => {
    setHasConfirmedCancel(() => true);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: (response: any) => {
      props.onCancel(appointment.appointmentId);
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

  const appointmentCancelHandler = () => {
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
      doctorsComment: doctorsComment,
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
          <p className="text-red-800 text-xl text-center">Cancel Appointment</p>
        </div>
        {!hasConfirmedCancel && (
          <div className="flex flex-col gap-4">
            <p
              className="space-x-2 border-b-[1px] border-gray-300
              pb-4"
            >
              <span>
                Are you sure that you want to cancel an appointment on schedule
                on
              </span>
              <span className="font-semibold">
                {appointmentDate}, {appointmentStartTime} - {appointmentEndTime}
              </span>
              <span>with</span>
              <span className="font-semibold">{patientName}?</span>
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
        {hasConfirmedCancel && (
          <div className="flex flex-col gap-4  ">
            <p className="space-x-2">
              <span>You are cancelling an appointment on schedule on</span>
              <span className="font-semibold">
                {appointmentDate}, {appointmentStartTime} - {appointmentEndTime}
              </span>
              <span>with</span>
              <span className="font-semibold">{patientName}.</span>
            </p>
            <div
              className="w-full space-y-2 border-b-[1px] border-gray-300
              pb-4"
            >
              <p className="text-gray-700 text-sms mb-2">
                Provide reason for cancelling the appointment
              </p>
              <label htmlFor="subject" className="text-gray-800 text-sm">
                <span>Reason</span>
                <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                className="w-full bg-gray-300 border-[2px] outline-none
                  border-gray-300 rounded h-24 resize-none p-2
                  focus:border-primary text-sm transition-all"
                value={doctorsComment}
                onChange={(event) =>
                  setDoctorsComment(() => event.target.value)
                }
              />
            </div>
            <div className="mt-2">
              {!isLoading && (
                <Button
                  label="Cancel"
                  type="button"
                  onClick={() => appointmentCancelHandler()}
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
