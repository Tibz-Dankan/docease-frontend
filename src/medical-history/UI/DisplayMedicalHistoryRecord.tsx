import React, { Fragment } from "react";
import { MedicalRecordCard } from "./MedicalRecordCard";
import { useQuery } from "@tanstack/react-query";
import { getMedicalRecordByUser } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { Loader } from "../../shared/UI/Loader";
import { TMedication } from "../../types/medication";

type TMedicationAPIExtended = TMedication & {
  createdAt: string;
  updateAt: string;
};

interface DisplayMedicalHistoryRecord {
  patientId: string;
}

export const DisplayMedicalHistoryRecord: React.FC<
  DisplayMedicalHistoryRecord
> = (props) => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`d-patient-medical-records-${props.patientId}`],
    queryFn: () =>
      getMedicalRecordByUser({
        userId: props.patientId,
        accessToken: accessToken,
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

  const medication = data?.data?.medicalRecords as TMedicationAPIExtended[];

  return (
    <Fragment>
      <div className="flex flex-col gap-6 w-full">
        <div
          className=" w-full text-gray-800s text-center
          bg-gray-300 rounded-md p-4 text-primary
          "
        >
          <p>Medical Record</p>
        </div>
        {medication.map((medication, index) => (
          <div key={index}>
            <MedicalRecordCard
              healthStatus={medication.healthStatus}
              illness={medication.illness}
              medication={medication.medication}
              diet={medication.diet}
              createdAt={medication.createdAt}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
