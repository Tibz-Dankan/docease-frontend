import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { Loader } from "../../shared/UI/Loader";
import { TMentalHealthAssessment } from "../../types/mentalHealth";
import { getMentalAssessmentByUser } from "../API";
import { Button } from "../../shared/UI/Button";

export const DisplayAssessmentViewInitiator: React.FC = () => {
  const { patientId } = useParams();

  const user = useSelector((state: TAuthState) => state.auth?.user)!;

  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`d-mental-health-assessments-${patientId}`],
    queryFn: () =>
      getMentalAssessmentByUser({ userId: patientId!, token: accessToken }),
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

  const assessments = data?.data?.mentalHealth as TMentalHealthAssessment[];

  const hasAssessment = !!assessments[0];

  if (!hasAssessment)
    return (
      <div className="w-full h-full flex justify-center items-center">
        Patient has no health assessments yet!
      </div>
    );

  return (
    <Fragment>
      <div
        className="w-full h-full flex justify-center 
         items-center p-2"
      >
        <Link
          to={`/${user.role}/my-patients/patient-health-assessment/${patientId}/${assessments[0]?.mentalHealthId}`}
        >
          <Button
            label="View Assessment"
            type="button"
            className="text-center w-36"
          />
        </Link>
      </div>
    </Fragment>
  );
};
