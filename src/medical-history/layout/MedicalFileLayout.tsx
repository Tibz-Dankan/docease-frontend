import React, { Fragment } from "react";
import { MedicalFileUpload } from "../UI/MedicalFileUpload";
import { MedicalFileList } from "../UI/MedicalFileList";
import { MedicalLayout } from "./MedicalLayout";

export const MedicalFileLayout: React.FC = () => {
  return (
    <Fragment>
      <MedicalLayout>
        <div
          className="flex flex-col justify-start items-center
           sm:flex-row sm:items-start sm:justify-center gap-4
           w-full 2xl:w-[1000px] py-8"
        >
          <MedicalFileUpload />
          <MedicalFileList />
        </div>
      </MedicalLayout>
    </Fragment>
  );
};
