import React, { Fragment } from "react";

interface AssessmentResultCardProps {
  message: string;
}

export const AssessmentResultCard: React.FC<AssessmentResultCardProps> = (
  props
) => {
  return (
    <Fragment>
      <div className="border-[1px] border-gray-300 rounded-md p-4 mt-8">
        <p className="text-lg text-gray-800 mb-4">Summary</p>
        <p className="rounded-md bg-gray-20 bg text-gray-700">
          {props.message}
        </p>
      </div>
    </Fragment>
  );
};
