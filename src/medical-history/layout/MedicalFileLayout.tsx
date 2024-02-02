import React, { Fragment } from "react";
import { MedicalFileUpload } from "../UI/MedicalFileUpload";
import { MedicalFileList } from "../UI/MedicalFileList";
import { MedicalLayout } from "./MedicalLayout";

export const MedicalFileLayout: React.FC = () => {
  return (
    <Fragment>
      <MedicalLayout>
        <div className="flex items-start justify-center gap-4 w-full py-8">
          <MedicalFileUpload />
          <MedicalFileList />
        </div>
      </MedicalLayout>
    </Fragment>
  );
};
