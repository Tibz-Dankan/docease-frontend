import React, { Fragment } from "react";

interface AIResponseProps {
  message: string;
}

export const AIResponse: React.FC<AIResponseProps> = (props) => {
  const message = props.message;

  return (
    <Fragment>
      <div
        className="w-full h-[30vh]s overflow-x-hidden p-4 sm:p-8 rounded-2xl
        flex items-center justify-center gap-4 bg-gray-300s text-gray-900
        font-light bg-[#868e96]"
      >
        <p>{message}</p>
      </div>
    </Fragment>
  );
};
