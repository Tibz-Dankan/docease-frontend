import React, { Fragment, ReactNode, useEffect, useState } from "react";
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
  const [showTwoFABanner, setShowTwoFABanner] = useState<boolean>(
    !hasTwoFAFullySetUp
  );

  const closeTwoFABannerHandler = (hideBanner: boolean) => {
    setShowTwoFABanner(() => !hideBanner);
  };

  const [headerHeight, setHeaderHeight] = useState<string>("min-h-16");
  const [marginTop, setMarginTop] = useState<string>("mt-24");

  useEffect(() => {
    const computeHeaderHeight = () => {
      const hasTwoFABanner: boolean = showTwoFABanner;
      const hasVideoConferenceBanner: boolean = hasRequestVideoConferenceId;
      const showingAllBanners: boolean =
        hasTwoFABanner && hasVideoConferenceBanner;

      if (showingAllBanners) {
        setHeaderHeight(() => "min-h-[calc(64px+80px)]");
        setMarginTop(() => "mt-[calc(64px+80px+32px)]");
        return;
      }
      if (hasTwoFABanner) {
        setHeaderHeight(() => "min-h-[calc(64px+40px)]");
        setMarginTop(() => "mt-[calc(64px+40px+32px)]");
        return;
      }
      if (hasVideoConferenceBanner) {
        setHeaderHeight(() => "min-h-[calc(64px+40px)]");
        setMarginTop(() => "mt-[calc(64px+40px+32px)]");
        return;
      }
    };

    computeHeaderHeight();
  }, [showTwoFABanner, hasRequestVideoConferenceId]);

  return (
    <Fragment>
      <div
        className="min-h-screen bg-gray-100 
         w-full relative"
      >
        <DashboardSidebar routes={props.routes} />
        <div
          className={`w-full fixed top-0 right-0 left-0 xl:left-72
          z-[100] xl:w-[calc(100vw-300px)] ${headerHeight}`}
        >
          <DashboardHeader />
          {hasRequestVideoConferenceId && <VCNotificationBanner />}
          {showTwoFABanner && <TwoFABanner onClose={closeTwoFABannerHandler} />}
        </div>
        <div className={`p-4 pt-0 xl:ml-72 relative ${marginTop}`}>
          <main
            className="flex items-center justify-center
            min-h-[84vh] h-auto"
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
