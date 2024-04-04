import React, { Fragment } from "react";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import { getDoctorsPatients } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { PatientProfileCard } from "../../patient/UI/PatientProfileCard";
import { PatientProfileCardLoader } from "../../patient/UI/PatientProfileCardLoader";

type TOnlineStatus = {
  updatedAt: string;
};

type TPatient = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  onlineStatus: TOnlineStatus;
};

type TDoctorsPatient = {
  doctorsPatientId: string;
  doctorId: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  Patient: TPatient;
};

export const MyPatients: React.FC = () => {
  const dispatch: any = useDispatch();

  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { data, isLoading } = useQuery({
    queryKey: [`doctors-patients-${userId}`],
    queryFn: () =>
      getDoctorsPatients({ doctorId: userId, accessToken: accessToken }),
    onSuccess: (_: any) => {},
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return <PatientProfileCardLoader />;
  }

  const patients = data?.data?.patients as TDoctorsPatient[];

  const hasPatients = !!patients[0];

  return (
    <Fragment>
      <div className=" w-full flex flex-col items-center justify-center">
        <div className="text-lg text-gray-800">
          {hasPatients && <span>My patients</span>}
          {!hasPatients && <span>You have no patients yet!</span>}
        </div>
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
           gap-4 mt-16 place-items-center"
        >
          {patients.map((patient, index) => (
            <div key={index}>
              <PatientProfileCard
                patientId={patient.patientId}
                firstName={patient.Patient.firstName}
                lastName={patient.Patient.lastName}
                gender={patient.Patient.gender}
                role={patient.Patient.role}
                imageUrl={patient.Patient.imageUrl}
                createdAt={patient.Patient.createdAt}
                updatedAt={patient.Patient.updatedAt}
                lastSeenAt={patient.Patient.onlineStatus.updatedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
