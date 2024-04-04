import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMentalAssessmentByUser } from "../API";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TMentalHealthAssessment } from "../../types/mentalHealth";
import { AppDate } from "../../utils/appDate";
import { Link, useParams } from "react-router-dom";
import { AssessmentHistoryLoader } from "./AssessmentHistoryLoader";

export const AssessmentHistory: React.FC = () => {
  const user = useSelector((state: TAuthState) => state.auth?.user)!;
  const { mentalHealthId } = useParams();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`mental-health-assessments-${user.userId}`],
    queryFn: () =>
      getMentalAssessmentByUser({ userId: user.userId, token: accessToken }),
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
        <AssessmentHistoryLoader />
      </div>
    );
  }

  if (!data) return;

  const assessments = data?.data?.mentalHealth as TMentalHealthAssessment[];

  const isSameMentalHealthId = (id: string): boolean => {
    return mentalHealthId === id;
  };

  return (
    <Fragment>
      <div
        className="p-4 w-full h-[80vh] bg-gray-400s rounded-md
         overflow-x-hidden flex flex-col items-center gap-4
         border-gray-400 border-primarys border-[2px]"
      >
        <div
          className="w-full text-center border-b-[2px]
            border-primary bg-gray-300 rounded-t-md
            p-2 sm:px-4  sm:py-2"
        >
          <span className="text-gray-800 w-full">Assessment History</span>
        </div>
        <ul className="w-full flex flex-col items-center gap-2">
          {assessments.map((assessment, index) => (
            <li key={index}>
              <Link
                to={`/${user.role}/mental-health/assessment/history/${assessment.mentalHealthId}`}
              >
                <p
                  className={`text-gray-800 font-light text-[15px]
                   hover:text-primary focus:text-primary
                   border-b-[1px] border-gray-300 w-full text-center p-2
                   ${
                     isSameMentalHealthId(assessment.mentalHealthId) &&
                     "bg-gray-300 "
                   }sm:px-4 rounded-md`}
                >
                  {new AppDate(assessment.createdAt).dayMonthYear()}{" "}
                  {new AppDate(assessment.createdAt).time()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};
