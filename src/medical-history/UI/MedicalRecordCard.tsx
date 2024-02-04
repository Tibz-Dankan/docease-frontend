import React, { Fragment } from "react";
import { TMedication } from "../../types/medication";
import { AppDate } from "../../utils/appDate";

type MedicalRecordCardProps = TMedication & {
  createdAt: string;
};

export const MedicalRecordCard: React.FC<MedicalRecordCardProps> = (props) => {
  const createdAt = new AppDate(props.createdAt).dayMonthYear();
  return (
    <Fragment>
      <div
        className="p-4 flex flex-col gap-4 rounded shadow-lgs border-[1px] 
        border-gray-200 relative"
      >
        <div className="absolute top-1 right-2 text-sm">
          <span className="text-gray-500 text-sm font-semibold">
            {createdAt}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-gray-500 font-light text-sm">
            Health Status
          </span>
          <p className="text-gray-800">{props.healthStatus}</p>
        </div>
        <div className="space-y-1">
          <span className="text-gray-500 font-light text-sm">Illness</span>
          <p className="text-gray-800">{props.illness}</p>
        </div>
        <div className="space-y-1">
          <span className="text-gray-500 font-light text-sm">Medication</span>
          <p className="text-gray-800">{props.medication}</p>
        </div>
        <div className="space-y-1">
          <span className="text-gray-500 font-light text-sm">Diet</span>
          <p className="text-gray-800">{props.diet}</p>
        </div>
      </div>
    </Fragment>
  );
};
