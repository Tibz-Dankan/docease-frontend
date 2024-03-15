import React, { Fragment } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IconContext } from "react-icons";

export const MessageBadge: React.FC = () => {
  return (
    <Fragment>
      <div
        className="flex items-center gap-x-2 text-[12px] px-2
           bg-primary text-gray-100 rounded-tl"
      >
        <span className="cursor-pointer">
          <IconContext.Provider
            value={{
              size: "1.0rem",
              color: "#f1f3f5",
            }}
          >
            <BiMessageSquareDetail />
          </IconContext.Provider>
        </span>
        <span>Message</span>
      </div>
    </Fragment>
  );
};
