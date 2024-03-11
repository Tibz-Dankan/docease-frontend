import React, { Fragment, ReactNode, useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
// import { Footer } from "./Footer";
import { useSelector } from "react-redux";
import { TVideoConferenceConnectedState } from "../../types/videoConference";
import { VCNotificationBanner } from "../../video-conference/layout/VCNotificationBanner";
import { TAuthState } from "../../types/auth";
import { TwoFABanner } from "../../auth/layout/TwoFABanner";

type TPage = {
  name: string;
  icon: ReactNode;
  path: string;
  element: ReactNode;
};

type TRoute = {
  title: string;
  pages: TPage[];
};

interface DashLayoutProps {
  routes: TRoute;
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashLayoutProps> = (props) => {
  const videoConference = useSelector(
    (state: TVideoConferenceConnectedState) => state.videoConference
  );
  const twoFA = useSelector((state: TAuthState) => state.auth.user?.twoFA!);

  const hasRequestVideoConferenceId: boolean =
    !!videoConference.requestConnectVideoConferenceId;

  const hasTwoFAFullySetUp: boolean = twoFA?.isEnabled && twoFA?.isVerified;
  const [showTwoFABanner, setShowTwoFABanner] =
    useState<boolean>(hasTwoFAFullySetUp);

  const closeTwoFABannerHandler = (showBanner: boolean) => {
    setShowTwoFABanner(() => showBanner);
  };

  return (
    <Fragment>
      <div
        className="min-h-screen bg-gray-100 
         w-full relative"
      >
        <DashboardSidebar routes={props.routes} />
        {/* TODO: To make dashboard header fixed */}
        <div className="xl:ml-72">
          {hasRequestVideoConferenceId && <VCNotificationBanner />}
          <DashboardHeader />
          {!showTwoFABanner && (
            <TwoFABanner onClose={closeTwoFABannerHandler} />
          )}
        </div>
        <div className="p-4 pt-0 xl:ml-72 relative">
          <main
            className="flex items-center justify-center
            selection: min-h-[84vh] h-auto"
          >
            {props.children}
          </main>
          <div
            className="text-blue-gray-600 flex items-center 
             justify-center mt-12"
          >
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
