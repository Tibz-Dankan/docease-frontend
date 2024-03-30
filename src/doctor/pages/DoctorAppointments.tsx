import React, { Fragment } from "react";
import { DoctorAppointmentList } from "../../appointment/UI/DoctorAppointmentList";
import { ScheduleLayout } from "../../schedule/layout/ScheduleLayout";
import { Button } from "../../shared/UI/Button";
import { Modal } from "../../shared/UI/Modal";

export const DoctorAppointments: React.FC = () => {
  return (
    <Fragment>
      <div>
        <Modal
          openModalElement={
            <Button
              type="button"
              label={"Add/Update Schedule"}
              className="w-36 text-sm mt-8"
            />
          }
          className="w-[90vw] sm:w-[600px] p-8 pt-12 relative text-end"
        >
          <ScheduleLayout />
        </Modal>
        <DoctorAppointmentList />
      </div>
    </Fragment>
  );
};
