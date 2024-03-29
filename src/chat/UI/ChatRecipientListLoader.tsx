import React, { Fragment } from "react";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";

export const ChatRecipientListLoader: React.FC = () => {
  const recipients = [1, 2, 3];

  return (
    <Fragment>
      <div
        className="w-full sm:w-72 h-[58vh] sm:h-[50vh] 
         overflow-x-hidden border-[1px] border-gray-400 
         border-t-[0px] shadow-md bg-gray-50"
      >
        <div className="transition-all">
          {recipients.map((_, index) => {
            return (
              <div
                key={index}
                className="relative p-2 flex items-center justify-start
                 border-b-[1px] gap-2"
              >
                {/* Recipient Profile Image Loader */}
                <div
                  className="bg-gray-300 flex items-center
                   justify-center w-14 h-14 rounded-[50%]"
                ></div>
                <div
                  className="flex-1 flex flex-col items-between justify-center
                    gap-[2px] text-sm text-gray-800"
                >
                  <div>
                    {/* Recipient Name Loader */}
                    <div className="w-3/5 h-5 rounded">
                      <SkeletonLoader />
                    </div>
                    {/* Last message date Loader */}
                    <div className="w-16 h-5 rounded absolute top-2 right-2">
                      <SkeletonLoader />
                    </div>
                  </div>
                  <div className="w-full flex items-end justify-between mt-1">
                    {/* Last message Loader */}
                    <div className="w-[85%] h-10 rounded flex flex-col gap-1">
                      <div className="w-full h-6">
                        <SkeletonLoader />
                      </div>
                      <div className="w-3/5 h-6">
                        <SkeletonLoader />
                      </div>
                    </div>
                    {/* message count Loader */}
                    <div
                      className="grid place-items-center rounded-[50%] h-5 
                       min-w-5"
                    >
                      <SkeletonLoader />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
