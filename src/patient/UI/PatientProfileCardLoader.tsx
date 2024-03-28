import React, { Fragment } from "react";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";

export const PatientProfileCardLoader: React.FC = () => {
  const cards = [1, 2, 3];

  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16">
        {cards.map((_, index) => (
          <div
            className="w-full p-4 relative rounded-md shadow-md
             bg-gray-50 space-y-2"
            key={index}
          >
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
            {/* View Medical History operation Loader */}
            <div className="w-full h-8 rounded-xl">
              <SkeletonLoader />
            </div>
            {/* View Mental Health Assessment operation Loader */}
            <div className="w-full h-8 rounded-xl">
              <SkeletonLoader />
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
