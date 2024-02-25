import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface ImageProps {
  src: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <Fragment>
      <div
        className={twMerge(
          `w-full h-auto aspect-[4/3] rounded bg-gray-300`,
          props.className
        )}
        style={{
          backgroundImage: `url(${props.src})`,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Fragment>
  );
};
