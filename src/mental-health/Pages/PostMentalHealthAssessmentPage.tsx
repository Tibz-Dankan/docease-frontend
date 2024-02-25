import React, { Fragment } from "react";
import { PostAssessment } from "../UI/PostAssessment";
import { MentalHealthAssessmentLayout } from "../layout/MentalHealthAssessmentLayout";

export const PostMentalHealthAssessmentPage: React.FC = () => {
  return (
    <Fragment>
      <div className="w-full">
        <MentalHealthAssessmentLayout>
          <PostAssessment />
        </MentalHealthAssessmentLayout>
      </div>
    </Fragment>
  );
};
