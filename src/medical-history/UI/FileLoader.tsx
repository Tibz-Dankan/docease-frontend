import React, { Fragment } from "react";
import { SkeletonLoader } from "../../shared/UI/Loader/SkeletonLoader";

export const FileLoader: React.FC = () => {
  const files = [1, 2, 3, 4];

  return (
    <Fragment>
      <div className="w-full mt-8 sm:mt-0 space-y-4">
        <div
          className="w-full text-gray-800s text-center
          bg-gray-300s rounded-md p-4 text-primary
          border-2 border-gray-400"
        >
          <p>Uploaded Files</p>
        </div>
        <div
          className="sm:max-h-[55vh] overflow-x-hidden sm:pt-4 pb-8 px-4
          grid grid-cols-1 lg:grid-cols-2 gap-2 sm:bg-gray-100 
          rounded-md"
        >
          {files.map((_, index) => (
            <div className="w-auto items-center p-2" key={index}>
              <div
                className="flex flex-col items-center justify-center gap-2
                 p-4 rounded-md border-2 border-gray-400 shadow bg-gray-50"
              >
                {/* File createdAt Loader */}
                <div className="w-full h-8 rounded-xl">
                  <SkeletonLoader />
                </div>
                {/* File item Loader */}
                <div className="w-fulls h-28 w-32 rounded-xl">
                  <SkeletonLoader />
                </div>
                {/* File operations Loader */}
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-8 rounded-xl">
                    <SkeletonLoader />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
