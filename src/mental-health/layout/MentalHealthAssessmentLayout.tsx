import React, { Fragment, ReactNode } from "react";
import { AssessmentHistory } from "../UI/AssessmentHistory";

interface AssessmentLayout {
  children: ReactNode;
}

export const MentalHealthAssessmentLayout: React.FC<AssessmentLayout> = (
  props
) => {
  return (
    <Fragment>
      <div
        className="w-full flex justify-start 
         items-start bg-white  rounded-md
         gap-4"
      >
        <div className="w-40 sm:w-60">
          <AssessmentHistory />
        </div>
        <div className="flex-1 max-h-[80vh] overflow-x-hidden">
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};
