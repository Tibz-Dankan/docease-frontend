import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DoctorAppointmentCard } from "./DoctorAppointmentCard";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/reducers/notification";
import { getAllDoctors } from "../API";
import { Loader } from "../../shared/UI/Loader";

interface AccessToken {
  createdAt: string;
}
interface Doctor {
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  accessTokens: AccessToken[];
}

export const DoctorsList: React.FC = () => {
  const dispatch: any = useDispatch();

  const token = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { isLoading, data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors(token),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading)
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;

  const doctors = data?.data.doctors as Doctor[];

  return (
    <Fragment>
      <div className="flex items-center justify-center gap-8">
        {doctors.map((doctor, index) => (
          <div key={index}>
            <DoctorAppointmentCard
              userId={doctor.userId}
              firstName={doctor.firstName}
              lastName={doctor.lastName}
              gender={doctor.gender}
              role={doctor.role}
              imageUrl={doctor.imageUrl}
              createdAt={doctor.createdAt}
              updatedAt={doctor.updatedAt}
              lastSeenAt={doctor.accessTokens[0].createdAt}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
