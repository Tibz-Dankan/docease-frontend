import React, { Fragment } from "react";
import { UploadProfilePicture } from "../UI/UploadProfilePicture";
import { UpdateProfile } from "../UI/UpdateProfile";
import { ChangePassword } from "../UI/ChangePassword";
import { DeviceLayout } from "../../device/layout/DeviceLayout";

export const Settings: React.FC = () => {
  return (
    <Fragment>
      <div className="flex items-start justify-center gap-8">
        <div>
          <UploadProfilePicture />
        </div>
        <div className="flex flex-col gap-4">
          <UpdateProfile />
          <ChangePassword />
          <DeviceLayout />
        </div>
      </div>
    </Fragment>
  );
};
