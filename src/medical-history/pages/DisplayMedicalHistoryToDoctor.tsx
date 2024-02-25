import React, { Fragment } from "react";
import { DisplayMedicalHistoryFile } from "../UI/DisplayMedicalHistoryFile";
import { DisplayMedicalHistoryRecord } from "../UI/DisplayMedicalHistoryRecord";
import { useParams } from "react-router-dom";

export const DisplayMedicalHistoryToDoctor: React.FC = () => {
  const { patientId } = useParams();

  console.log("patientId :", patientId);

  return (
    <Fragment>
      <div
        className="w-full flex flex-col items-center  bg-geen-500
         justify-center gap-8 p-4 sm:p-16 lg:max-w-[700px]"
      >
        <DisplayMedicalHistoryFile patientId={patientId!} />
        <DisplayMedicalHistoryRecord patientId={patientId!} />
      </div>
    </Fragment>
  );
};
