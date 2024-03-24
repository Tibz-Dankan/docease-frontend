import React, { Fragment, useEffect, useRef } from "react";
import { UploadProfilePicture } from "../UI/UploadProfilePicture";
import { UpdateProfile } from "../UI/UpdateProfile";
import { ChangePassword } from "../UI/ChangePassword";
import { DeviceLayout } from "../../device/layout/DeviceLayout";
import { AuthDeviceLayout } from "../../auth/layout/AuthDeviceLayout";
import { useSearchParams } from "react-router-dom";
import { SettingsHeader } from "../layout/SettingsHeader";
import { ChangePasswordDescription } from "../../auth/UI/ChangePasswordDescription";

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
      <div
        className="flex flex-col  items-center 
        justify-center gap-16"
      >
        <div className="w-full">
          <SettingsHeader />
        </div>
        <div
          className="w-full flex flex-col md:flex-row
          items-center justify-center md:items-start gap-8"
        >
          <UploadProfilePicture />
          <UpdateProfile />
        </div>
        <div className="w-full flex flex-col gap-16">
          <div
            className="w-full flex flex-col md:flex-row justify-center 
             items-center md:items-start gap-8"
          >
            <ChangePasswordDescription />
            <ChangePassword />
          </div>
          <DeviceLayout />
          <div ref={twoFARef}>
            <AuthDeviceLayout />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
