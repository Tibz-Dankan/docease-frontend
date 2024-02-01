import React, { Fragment } from "react";
import { UploadProfilePicture } from "../UI/UploadProfilePicture";
import { UpdateProfile } from "../UI/UpdateProfile";
import { ChangePassword } from "../UI/ChangePassword";

export const Settings: React.FC = () => {
  return (
    <Fragment>
      <div className="flex items-start justify-center gap-8">
        <div>
          <UploadProfilePicture />
        </div>
        <div className="flex flex-col items-centers justify-starts bg-green-500s">
          <UpdateProfile />
          <ChangePassword />
        </div>
      </div>
    </Fragment>
  );
};
