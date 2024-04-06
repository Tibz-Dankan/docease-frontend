import React, { Fragment } from "react";
import { Loader } from "../../shared/UI/Loader";

export const MessageLoader: React.FC = () => {
  return (
    <Fragment>
      <div
        className="w-full h-auto flex items-center justify-center mb-4
        transition-all"
      >
        <div className="bg-primary  p-2 rounded-[50%]">
          <Loader className="w-6 h-6 text-gray-100 ml-2s" />
        </div>
      </div>
    </Fragment>
  );
};
