import React, { Fragment, ReactNode } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface BannerCardProps {
  className?: string;
  children: ReactNode;
  onClose: (value: boolean) => void;
}

export const BannerCard: React.FC<BannerCardProps> = (props) => {
  const onCloseHandler = () => {
    props.onClose(true);
  };

  return (
    <Fragment>
      <div
        className={twMerge(
          `w-full bg-primary relative px-4 pr-12 h-10`,
          props.className
        )}
      >
        {props.children}
        <span
          className="absolute right-4 top-2 cursor-pointer"
          onClick={() => onCloseHandler()}
        >
          <IconContext.Provider
            value={{
              size: "1.2rem",
              color: "#fff",
            }}
          >
            <IoClose />
          </IconContext.Provider>
        </span>
      </div>
    </Fragment>
  );
};
