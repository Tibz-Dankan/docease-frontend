import { Fragment } from "react";
import { AppDate } from "../../utils/appDate";
// import { AppDate } from "../../../utils/index.ts";

export const MessageDay = (props: any) => {
  const day = () => new AppDate(props.createdAt).day();

  return (
    <Fragment>
      <div className="flex  items-center justify-between mb-3">
        <span className="h-[1px] grow bg-gray-light-4"></span>
        <span
          className="bg-gray-300 px-3 py-2 rounded-md mx-2
        text-gray-700 text-sm font-semibold shadow-sm"
        >
          {day()}
        </span>
        <span className="h-[1px] grow bg-gray-light-4"></span>
      </div>
    </Fragment>
  );
};
