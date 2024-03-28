import React, { Fragment } from "react";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";

export const AssessmentHistoryLoader: React.FC = () => {
  const assessments = [1, 2, 3, 4, 5, 6];

  return (
    <Fragment>
      <div
        className="p-4 w-full h-[80vh] bg-gray-400s rounded-md
         overflow-x-hidden flex flex-col items-center gap-4
         border-gray-400  border-[2px]"
      >
        <div
          className="w-full text-center border-b-[2px]
            border-primary bg-gray-300 rounded-t-md
            p-2 sm:px-4  sm:py-2"
        >
          <span className="text-gray-800 w-full">Assessment History</span>
        </div>
        {/* Assessment Loader */}
        <ul className="w-full flex flex-col items-center gap-2">
          {assessments.map((_, index) => (
            <div className="w-full h-8 rounded-xl" key={index}>
              <SkeletonLoader />
            </div>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};
