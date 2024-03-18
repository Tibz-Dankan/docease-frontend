import React, { Fragment } from "react";
import { AuthDeviceList } from "../UI/AuthDeviceList";

export const AuthDeviceLayout: React.FC = () => {
  return (
    <Fragment>
      <div className="w-full" id="twofa">
        <AuthDeviceList />
      </div>
    </Fragment>
  );
};
