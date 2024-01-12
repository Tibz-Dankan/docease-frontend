import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <Fragment>
      <div>
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff"
          className={twMerge("text-gray-600", props.className)}
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      </div>
    </Fragment>
  );
};
