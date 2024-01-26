import React, { Fragment } from "react";
import { DisplayAppointmentCard } from "./DisplayAppointmentCard";
import { useSelector, useDispatch } from "react-redux";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/reducers/notification";
import { getAppointmentsByPatient } from "../API";
import { Loader } from "../../shared/UI/Loader";
import { TAppointment } from "../../types/appointments";

export const PatientAppointmentList: React.FC = () => {
  const dispatch: any = useDispatch();

  const token = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;

  const { isLoading, data } = useQuery({
    queryKey: [`patient-${userId}`],
    queryFn: () =>
      getAppointmentsByPatient({ patientId: userId, token: token }),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;
  }

  if (!data) return;

  const appointments = data.data.appointments as TAppointment[];
  console.log("appointments:", appointments);

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16">
        {appointments.map((appointment, index) => (
          <div key={index}>
            <DisplayAppointmentCard appointment={appointment} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
