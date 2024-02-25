import React, { Fragment } from "react";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import { getDoctorsPatients } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../shared/UI/Loader";
import { PatientProfileCard } from "../../patient/UI/PatientProfileCard";

type TAccessTokens = {
  createdAt: string;
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
  accessTokens: TAccessTokens[];
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
    onSuccess: (response: any) => {
      console.log("response: ", response);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;
  }

  const patients = data?.data?.patients as TDoctorsPatient[];

  const hasPatients = !!patients[0];

  return (
    <Fragment>
      <div>
        <div className="text-lg text-gray-800">
          {hasPatients && <span>My patients</span>}
          {!hasPatients && <span>You have no patients yet!</span>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16">
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
                lastSeenAt={patient.Patient.accessTokens[0].createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
