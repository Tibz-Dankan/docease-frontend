import React, { Fragment, useEffect, useRef } from "react";
import { UploadProfilePicture } from "../UI/UploadProfilePicture";
import { UpdateProfile } from "../UI/UpdateProfile";
import { ChangePassword } from "../UI/ChangePassword";
import { DeviceLayout } from "../../device/layout/DeviceLayout";
import { AuthDeviceLayout } from "../../auth/layout/AuthDeviceLayout";
import { useSearchParams } from "react-router-dom";

export const Settings: React.FC = () => {
  const [searchParams, _] = useSearchParams({ view: "" });

  const twoFARef = useRef<HTMLDivElement>(null);

  const view = searchParams.get("view");

  useEffect(() => {
    const scrollToElement = () => {
      if (!view) return;
      const hasToViewTwoFA: boolean = view == "twofa";
      const { current } = twoFARef;
      if (current !== null && hasToViewTwoFA) {
        current.scrollIntoView({ behavior: "smooth" });
      }
      // TODO: add other elements
    };

    scrollToElement();
  }, []);

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
          <div ref={twoFARef}>
            <AuthDeviceLayout />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
