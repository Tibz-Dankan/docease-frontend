import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMentalAssessment } from "../API";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TMentalHealthAssessment } from "../../types/mentalHealth";
import { useParams } from "react-router-dom";
import { AnsweredQuestions } from "../UI/AnsweredQuestions";
import { AIResponse } from "../UI/AIResponse";
import { DisplayAssessmentLayout } from "../layout/DisplayAssessmentLayout";
import { AssessmentHistoryPageLoader } from "./AssessmentHistoryPageLoader";

export const DisplayAssessmentHistoryPage: React.FC = () => {
  const { mentalHealthId } = useParams();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`d-mental-health-${mentalHealthId}`],
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
      <div className="w-full">
        <AssessmentHistoryPageLoader />
      </div>
    );
  }

  if (!data) return;

  const assessment = data?.data?.mentalHealth as TMentalHealthAssessment;

  return (
    <Fragment>
      <div>
        <DisplayAssessmentLayout>
          <div className="p-4 flex flex-col gap-2">
            <AnsweredQuestions
              answeredQuestions={assessment.answeredQuestions}
            />
            <div className="w-full border-b-[1px] border-gray-opacity my-2" />
            <AIResponse message={assessment.aiResponse} />
          </div>
        </DisplayAssessmentLayout>
      </div>
    </Fragment>
  );
};
