import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface ImageProps {
  src: string;
  className?: string;
  alt?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <Fragment>
      <img
        className={twMerge(
          `w-full h-auto aspect-[4/3] rounded bg-gray-300 
           object-cover`,
          props.className
        )}
        src={props.src}
        alt={props.alt}
      />
    </Fragment>
  );
};
