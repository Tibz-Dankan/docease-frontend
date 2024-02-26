import React, { Fragment, ReactNode } from "react";
import { DisplayAssessmentHistory } from "../UI/DisplayAssessmentHistory";

interface AssessmentLayout {
  children: ReactNode;
}

export const DisplayAssessmentLayout: React.FC<AssessmentLayout> = (props) => {
  return (
    <Fragment>
      <div
        className="w-full flex justify-start 
         items-start bg-white  rounded-md
         gap-4"
      >
        <div className="w-40 sm:w-60">
          <DisplayAssessmentHistory />
        </div>
        <div className="flex-1 max-h-[80vh] overflow-x-hidden">
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};
