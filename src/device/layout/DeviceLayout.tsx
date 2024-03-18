import React, { Fragment } from "react";
import { PostDevice } from "../UI/PostDevice";
import { DeviceList } from "../UI/DeviceList";

export const DeviceLayout: React.FC = () => {
  return (
    <Fragment>
      <div
        className="bg-white p-4 sm:p-8 rounded-md shadow-md space-y-4"
        id="push-notification"
      >
        <div className="bg-white p-4 rounded">
          <p
            className="text-gray-700 text-xl font-semibold
            text-center"
          >
            Push Notifications
          </p>
        </div>
        <PostDevice />
        <DeviceList />
      </div>
    </Fragment>
  );
};
