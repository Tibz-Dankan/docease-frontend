import React, { Fragment } from "react";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import Calendar from "react-calendar";

export const DashboardLoader: React.FC = () => {
  const statsCard = [1, 2, 3, 4];
  const recentInteractions = [1, 2, 3, 4, 5];
  const upcomingAppointments = [1, 2, 3, 4, 5];

  const userRole = useSelector((state: TAuthState) => state.auth.user?.role!);

  return (
    <Fragment>
      <div className="w-full">
        <div
          className="flex flex-col items-start justify-center 
           sm:flex-row sm:justify-start gap-5"
        >
          <div className="w-full space-y-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statsCard.map(() => (
                <div
                  className="p-4 space-y-2 shadow rounded-lg relative 
                  border-2 border-gray-400 bg-gray-50 "
                >
                  {/* Card Title Loader */}
                  <div className="w-4/5 h-8">
                    <SkeletonLoader />
                  </div>
                  {/* Card Count Loader */}
                  <div className="w-16 h-8">
                    <SkeletonLoader />
                  </div>
                  <span className="absolute top-2 right-2">
                    <IconContext.Provider
                      value={{ size: "1.4rem", color: "#868e96" }}
                    >
                      <FiChevronRight />
                    </IconContext.Provider>
                  </span>
                </div>
              ))}
            </div>
            {/* Recent interactions loader */}
            <div
              className="w-full text-gray-800 bg-gray-50 
               rounded-md shadow-md p-4"
            >
              <div className="border-b-[1px] border-gray-300 pb-2 mb-4">
                <span className="text-gray-600 text-sms text-center w-full">
                  {`${
                    userRole == "doctor" ? "Patients" : "Doctors"
                  } you have previously interacted with`}
                </span>
              </div>
              <div className="w-full flex flex-col gap-3">
                {recentInteractions.map((_, index) => (
                  <div className="w-full h-12" key={index}>
                    <SkeletonLoader />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="w-full space-y-6">
              {/* Calendar loader */}
              <div className="relative">
                {/* This calendar element is invisible */}
                <Calendar
                  className="w-full border-nones bg-gray-300 px-0 text-lg
                  rounded-lg h-[350px] border-2 border-gray-500 invisible"
                  tileClassName="relative"
                />
                <div
                  className="w-full bg-gray-300 rounded-lg h-full border-2
                 border-gray-500 flex items-center justify-center absolute
                  top-0 left-0"
                >
                  <SkeletonLoader />
                </div>
              </div>

              {/*Upcoming Appointments */}
              <div className="bg-gray-50 p-4 rounded-md shadow-md">
                <div className="border-b-[1px] border-gray-300 pb-2 mb-4">
                  <p
                    className="text-blue-600  text-center w-full
                    font-semibold"
                  >
                    Upcoming Appointments
                  </p>
                </div>
                <div className="w-full flex flex-col gap-3">
                  {upcomingAppointments.map((_, index) => (
                    <div className="w-full h-12" key={index}>
                      <SkeletonLoader />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
