import React, { Fragment } from "react";
import { Loader } from "../../shared/UI/Loader";

export const MessageLoader: React.FC = () => {
  return (
    <Fragment>
      <div
        className="bg-primary w-8 h-8 p-5 flex items-center 
            justify-center rounded-[50%] absolute left-[43%] top-[29%]
            z-[20]"
      >
        <Loader className="w-6 h-6 text-gray-100 ml-2" />
      </div>
    </Fragment>
  );
};
