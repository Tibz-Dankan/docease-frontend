import React, { Fragment } from "react";
import { MedicalForm } from "../UI/MedicalForm";
import { MedicalLayout } from "./MedicalLayout";
import { MedicalRecordList } from "../UI/MedicalRecordList";

export const MedicalFormLayout: React.FC = () => {
  return (
    <Fragment>
      <MedicalLayout>
        <div className="space-y-8 bg-white p-4 rounded-md">
          <div
            className="flex items-center justify-between w-full
           border-b-[1px] border-gray-300 pb-4"
          >
            <div className="text-gray-700">
              <p>Medical Form</p>
            </div>
            <MedicalForm />
          </div>

          <div>
            <MedicalRecordList />
          </div>
        </div>
      </MedicalLayout>
    </Fragment>
  );
};
