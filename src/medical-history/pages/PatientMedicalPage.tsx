import React, { Fragment } from "react";
// import { MedicalLayout } from "../layout/MedicalLayout";
import { MedicalFileLayout } from "../layout/MedicalFileLayout";

export const PatientMedicalPage: React.FC = () => {
  // Get the current URL hash
  const hash = window.location.hash;

  // Extract the word after the '#' symbol
  const wordAfterHash = hash.substring(1);

  console.log("Word after #:", wordAfterHash);

  //   const isFiles: boolean = wordAfterHash === "files";
  //   const isForm: boolean = wordAfterHash === "form";

  return (
    <Fragment>
      {/* {!isFiles && <MedicalLayout children={<MedicalFileLayout />} />} */}
      <MedicalFileLayout />
    </Fragment>
  );
};
