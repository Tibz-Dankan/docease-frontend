import React, { Fragment } from "react";
import { DoctorsList } from "../../doctor/UI/DoctorsList";
import { PatientAppointmentList } from "../../appointment/UI/PatientAppointmentList";

export const PatientAppointments: React.FC = () => {
  return (
    <Fragment>
      <div>
        <DoctorsList />
        <PatientAppointmentList />
      </div>
    </Fragment>
  );
};
