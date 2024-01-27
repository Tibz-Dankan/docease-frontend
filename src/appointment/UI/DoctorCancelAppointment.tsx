import React, { Fragment } from "react";
import { TAppointment } from "../../types/appointments";

interface DoctorCancelAppointmentProps {
  appointment: TAppointment;
}

export const DoctorCancelAppointment: React.FC<
  DoctorCancelAppointmentProps
> = () => {
  return (
    <Fragment>
      <div>DoctorCancelAppointment</div>
    </Fragment>
  );
};
