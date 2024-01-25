import React, { Fragment } from "react";
import { DoctorsList } from "../../doctor/UI/DoctorsList";

export const PatientAppointments: React.FC = () => {
  return (
    <Fragment>
      <div>
        <DoctorsList />
      </div>
    </Fragment>
  );
};
