import React, { Fragment } from "react";
import { MedicalFileLayout } from "../layout/MedicalFileLayout";

export const PatientMedicalPage: React.FC = () => {
  return (
    <Fragment>
      <div className="w-full">
        <MedicalFileLayout />
      </div>
    </Fragment>
  );
};
