import React, { Fragment } from "react";
import { MedicalRecordCard } from "./MedicalRecordCard";
// import medication from "../data/medication.json";
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

export const MedicalRecordList: React.FC = () => {
  const userId = useSelector(
    (state: TAuthState) => state.auth?.user?.userId
  ) as string;

  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`patient-medical-records-${userId}`],
    queryFn: () =>
      getMedicalRecordByUser({ userId: userId, accessToken: accessToken }),
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
      <div className="flex flex-col gap-6">
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
