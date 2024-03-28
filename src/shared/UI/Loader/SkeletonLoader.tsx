import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonLoaderProps {
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => {
  return (
    <Fragment>
      <div
        className={twMerge(
          `w-full h-full bg-gray-300 rounded-md relative`,
          props.className
        )}
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
