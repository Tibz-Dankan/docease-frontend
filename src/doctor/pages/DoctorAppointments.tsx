import React, { Fragment } from "react";
import { DoctorAppointmentList } from "../../appointment/UI/DoctorAppointmentList";

export const DoctorAppointments: React.FC = () => {
  return (
    <Fragment>
      <div>
        <DoctorAppointmentList />
      </div>
    </Fragment>
  );
};
