import React, { Fragment } from "react";
import { MedicalRecordCard } from "./MedicalRecordCard";
import medication from "../data/medication.json";

export const MedicalRecordList: React.FC = () => {
  return (
    <Fragment>
      <div className="flex flex-col gap-6">
        {medication.map((medication, index) => (
          <div key={index}>
            <MedicalRecordCard
              healthStatus={medication.healthStatus}
              illness={medication.illness}
              medication={medication.medication}
              diet={medication.diet}
              createdAt={medication.createdAt}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
