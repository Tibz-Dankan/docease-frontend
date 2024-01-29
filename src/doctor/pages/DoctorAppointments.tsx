import React, { Fragment } from "react";
import { DoctorAppointmentList } from "../../appointment/UI/DoctorAppointmentList";
import { ScheduleLayout } from "../../schedule/layout/ScheduleLayout";

export const DoctorAppointments: React.FC = () => {
  return (
    <Fragment>
      <div>
        <ScheduleLayout />
        <DoctorAppointmentList />
      </div>
    </Fragment>
  );
};
