import React, { Fragment } from "react";
import { Button } from "../../shared/UI/Button";

import { AppDate } from "../../utils/appDate";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { approveAppointment } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { TAppointment } from "../../types/appointments";
// import { onCloseModal } from "../../store/actions/modal";

interface DoctorApproveAppointmentProps {
  appointment: TAppointment;
  onApprove: (appointmentId: string) => void;
}

export const DoctorApproveAppointment: React.FC<
  DoctorApproveAppointmentProps
> = (props) => {
  const appointment = props.appointment;

  const appointmentStartTime = new AppDate(appointment.startsAt).time();
  const appointmentEndTime = new AppDate(appointment.endsAt).time();
  const patientName = `${appointment.patient?.firstName} ${appointment.patient?.lastName}`;

  const weekDay = new AppDate(appointment.endsAt).weekday();
  const dayMonthYear = new AppDate(appointment.endsAt).dayMonthYear();
  const appointmentDate = `${weekDay}, ${dayMonthYear}`;

  const auth = useSelector((state: TAuthState) => state.auth);
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: approveAppointment,
    onSuccess: (response: any) => {
      props.onApprove(appointment.appointmentId);
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

  const appointmentApproveHandler = () => {
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
          <p className="text-primary text-xl text-center">
            Approve Appointment
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p
            className="space-x-2 text-center border-b-[1px]
            border-gray-300 pb-4"
          >
            <span>Approve, to show</span>
            <span className="font-semibold">{patientName}</span>
            <span>that you are available for an appointment scheduled</span>
            <span className="font-semibold text-sm">
              {appointmentDate}, {appointmentStartTime} - {appointmentEndTime}.
            </span>
          </p>
          <div className="mt-2">
            {!isLoading && (
              <Button
                label="Approve"
                type="button"
                onClick={() => appointmentApproveHandler()}
                className="bg-primary text-white"
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
        </div>
      </div>
    </Fragment>
  );
};
