import React, { Fragment } from "react";
import { MentalHealthAssessmentLayout } from "../layout/MentalHealthAssessmentLayout";
import { useDispatch, useSelector } from "react-redux";
import { getMentalAssessment } from "../API";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { Loader } from "../../shared/UI/Loader";
import { TMentalHealthAssessment } from "../../types/mentalHealth";
import { Link, useParams } from "react-router-dom";
import { AnsweredQuestions } from "../UI/AnsweredQuestions";
import { AIResponse } from "../UI/AIResponse";
import { Button } from "../../shared/UI/Button";

export const AssessmentHistoryPage: React.FC = () => {
  const { mentalHealthId } = useParams();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`mental-health-${mentalHealthId}`],
    queryFn: () =>
      getMentalAssessment({
        mentalHealthId: mentalHealthId!,
        token: accessToken,
      }),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />
      </div>
    );
  }

  if (!data) return;

  const assessment = data?.data?.mentalHealth as TMentalHealthAssessment;

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
            <AnsweredQuestions
              answeredQuestions={assessment.answeredQuestions}
            />
            <div className="w-full border-b-[1px] border-gray-opacity my-2" />
            <AIResponse message={assessment.aiResponse} />
          </div>
        </MentalHealthAssessmentLayout>
      </div>
    </Fragment>
  );
};
