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
import { DoctorProfileCardLoader } from "../pages/DoctorProfileCardLoader";

interface OnlineStatus {
  updatedAt: string;
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
  onlineStatus: OnlineStatus;
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

  if (isLoading) {
    return <DoctorProfileCardLoader />;
  }

  const doctors = data?.data.users as Doctor[];

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16">
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
              lastSeenAt={doctor.onlineStatus?.updatedAt}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
