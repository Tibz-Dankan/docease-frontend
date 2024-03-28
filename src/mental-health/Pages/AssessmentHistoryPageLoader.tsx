import React, { Fragment } from "react";
import { MentalHealthAssessmentLayout } from "../layout/MentalHealthAssessmentLayout";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";
import { Link } from "react-router-dom";
import { Button } from "../../shared/UI/Button";

export const AssessmentHistoryPageLoader: React.FC = () => {
  const answeredQuestions = [1, 2, 3, 4];

  return (
    <Fragment>
      <div>
        <MentalHealthAssessmentLayout>
          <div className="w-full flex items-center justify-end pt-4 pr-4">
            <Link to="/patient/mental-health/assessment">
              <Button
                label="Take Assessment"
                type="button"
                className="py-2 px-4 text-sm font-bold"
              />
            </Link>
          </div>
          <div className="p-4 flex flex-col gap-2">
            {/* AnsweredQuestions Loader*/}
            <div
              className="w-full h-[30vh] overflow-x-hidden sm:p-4 rounded-2xl
               flex flex-col items-start justify-center gap-4"
            >
              {answeredQuestions.map((_, index) => (
                <div key={index} className="w-full space-y-2">
                  {/* Question Loader */}
                  <div className="w-full h-8" key={index}>
                    <SkeletonLoader className="rounded-xl" />
                  </div>
                  {/* Option Loader */}
                  <div className="w-1/2 h-8" key={index}>
                    <SkeletonLoader className="rounded-xl" />
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full border-b-[1px] border-gray-opacity my-2" />

            {/* AI Response Loader */}
            <div className="w-full h-60 overflow-x-hidden">
              <SkeletonLoader
                className="rounded-2xl bg-[#868e96]"
                innerLoaderClassName="from-[#868e96] via-blue-gray-300 to-[#868e96]"
              />
            </div>
          </div>
        </MentalHealthAssessmentLayout>
      </div>
    </Fragment>
  );
};
