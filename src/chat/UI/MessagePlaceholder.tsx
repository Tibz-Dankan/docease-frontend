import React, { Fragment } from "react";

export const MessagePlaceholder: React.FC = () => {
  return (
    <Fragment>
      <div className="w-full h-[50vh] grid place-items-center">
        <span className="text-center">Your messages will appear here</span>
      </div>
    </Fragment>
  );
};
