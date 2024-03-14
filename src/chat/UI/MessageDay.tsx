import { Fragment } from "react";
import { AppDate } from "../../utils/appDate";

export const MessageDay = (props: any) => {
  const day = () => new AppDate(props.createdAt).day();

  return (
    <Fragment>
      <div className="flex  items-center justify-between mb-3">
        <span className="h-[1px] grow bg-gradient-to-l from-gray-400 to-gray-100"></span>
        <span
          className="bg-gray-300 px-3 py-1 rounded-lg mx-2
          text-gray-700 text-[14px] font-semibold shadow-sm"
        >
          {day()}
        </span>
        <span className="h-[1px] grow bg-gradient-to-r from-gray-400 to-gray-100"></span>
      </div>
    </Fragment>
  );
};
