import React, { Fragment } from "react";
import { TAppointment } from "../../types/appointments";

interface DoctorApproveAppointmentProps {
  appointment: TAppointment;
}

export const DoctorApproveAppointment: React.FC<
  DoctorApproveAppointmentProps
> = () => {
  return (
    <Fragment>
      <div>DoctorApproveAppointment</div>
    </Fragment>
  );
};
