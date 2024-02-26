import React, { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";

export const MessageBadge: React.FC = () => {
  return (
    <Fragment>
      <div
        className="flex items-center gap-x-2 text-[12px] px-2
           bg-primary text-gray-100 rounded-tl"
      >
        <svg className="w-4 h-4 fill-gray-100">
          <use href={`${sprite}#icon-message`}></use>
        </svg>
        <span>Message</span>
      </div>
    </Fragment>
  );
};
