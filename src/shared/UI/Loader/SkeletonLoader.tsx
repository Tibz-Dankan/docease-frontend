import React, { Fragment } from "react";

export const SkeletonLoader: React.FC = () => {
  return (
    <Fragment>
      <div
        className="w-full h-full bg-gray-300 rounded-md
        relative"
      >
        <div
          className="h-full w-1/2 absolute left-0 
          animate-moveInnerLoaderToRight bg-gradient-to-r
          from-gray-300 via-gray-200 to-gray-300 
          skew-x-[-5deg] opacity-70"
        ></div>
      </div>
    </Fragment>
  );
};
