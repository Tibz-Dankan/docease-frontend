import React, { Fragment } from "react";
import { StatsCard } from "../../shared/UI/StatsCard";
import { useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { IoPerson } from "react-icons/io5";
import { IconContext } from "react-icons";

export const DoctorDashboard: React.FC = () => {
  const user = useSelector((state: TAuthState) => state.auth.user);
  const userImageUrl = user?.imageUrl;

  return (
    <Fragment>
      <div className="w-full">
        <div className="w-full flex flex-col items-center justify-center pb-8 pt-4">
          {userImageUrl && (
            <img
              src={userImageUrl}
              alt="profile-img"
              className="w-16 h-16 rounded-[50%] mb-4"
            />
          )}
          {!userImageUrl && (
            <span
              className="cursor-pointer grid place-items-center bg-gray-300 p-1
              w-16 h-16 rounded-[50%] mb-4"
            >
              <IconContext.Provider value={{ size: "2rem", color: "#495057" }}>
                <IoPerson />
              </IconContext.Provider>
            </span>
          )}
          <p className="text-2xl text-gray-800">Hi, {user?.lastName}!</p>
          <p className="text-gray-600 text-sm text-center">
            There is something new checkout your dashboard
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 
           lg:grid-cols-4 gap-4"
        >
          <StatsCard
            title={"My Patients"}
            count={47}
            link={"/doctor/my-patients"}
          />
          <StatsCard
            title={"New Patients"}
            count={2}
            link={"/doctor/my-patients"}
          />
          <StatsCard
            title={"Unread messages"}
            count={6}
            link={"/doctor/messages"}
          />
          <StatsCard
            title={"Unread Notifications"}
            count={15}
            link={"/doctor/notifications"}
          />
          <StatsCard
            title={"Red Notifications"}
            count={0}
            link={"/doctor/notifications"}
          />
          <StatsCard
            title={"Yellow Notifications"}
            count={3}
            link={"/doctor/notifications"}
          />
        </div>
      </div>
    </Fragment>
  );
};
