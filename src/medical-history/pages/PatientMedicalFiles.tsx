import React, { Fragment } from "react";
import { MedicalLayout } from "../layout/MedicalLayout";
import { MedicalFileLayout } from "../layout/MedicalFileLayout";

export const PatientMedicalFiles: React.FC = () => {
  return (
    <Fragment>
      <div>
        <MedicalLayout children={<MedicalFileLayout />} />
      </div>
    </Fragment>
  );
};
