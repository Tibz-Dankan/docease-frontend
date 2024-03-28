import React, { Fragment } from "react";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";

export const AppointmentLoader: React.FC = () => {
  const cards = [1, 2, 3, 4, 5, 6];
  const statuses = [1, 2, 3];
  const callToActions = [1, 2, 3];

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16">
        {cards.map((_, index) => (
          <div
            className="w-full p-4 relative rounded-md shadow-md
             bg-gray-50 pt-10 space-y-2"
            key={index}
          >
            {/* Appointment Overall Loader */}
            <div className="text-center absolute top-0 left-0 w-full h-10">
              <SkeletonLoader className="rounded-t-md rounded-b-none" />
            </div>

            {/* Appointment status Loader */}
            <div
              className="flex items-center justify-center text-sm
              text-gray-800 mb-4 border-b-[1px] border-gray-300
              pb-4 gap-2"
            >
              {statuses.map((_, index) => (
                <div key={index} className={`rounded-xl h-4 w-14`}>
                  <SkeletonLoader />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* Appointment date Loader */}
              <div className="w-[40%] h-16 rounded">
                <SkeletonLoader />
              </div>
              {/* Appointment start and end time Loader */}
              <div className="w-[50%] h-16 rounded">
                <SkeletonLoader />
              </div>
            </div>

            {/* Appointment Subject Loader  */}
            <div className="w-full h-8 rounded-xl">
              <SkeletonLoader />
            </div>

            <div
              className="flex items-center justify-center gap-4
               border-[1px] border-gray-300 rounded-md p-4
               text-gray-800 relative"
            >
              {/* Profile Image Loader */}
              <div className="w-24 h-24 rounded-[50%] bg-gray-300"></div>
              {/* Username Loader */}
              <div className="flex flex-col items-start gap-2">
                <div className="w-40 h-10 rounded-md">
                  <SkeletonLoader />
                </div>
                {/* Last seen Loader */}
                <div className="w-32 h-8 rounded-md">
                  <SkeletonLoader />
                </div>
              </div>
            </div>

            {/* Appointment createdAt Loader */}
            <div className="w-full h-8 rounded-xl">
              <SkeletonLoader />
            </div>
            {/* Appointment operations Loader */}
            <div
              className="flex items-center justify-center gap-4
               border-t-[1px] border-gray-300 pt-4"
            >
              {callToActions.map((_, index) => (
                <div key={index} className={`rounded-md h-4 w-14`}>
                  <SkeletonLoader />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
