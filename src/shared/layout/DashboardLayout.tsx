import React, { Fragment, ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { Footer } from "./Footer";
import { useSelector } from "react-redux";
import { TVideoConferenceConnectedState } from "../../types/videoConference";
import { VCNotificationBanner } from "../../video-conference/layout/VCNotificationBanner";

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

  const hasRequestVideoConferenceId: boolean =
    !!videoConference.requestConnectVideoConferenceId;

  return (
    <Fragment>
      <div
        className="min-h-screen bg-gray-100 
         w-full relative pt-32 sm:pt-16"
      >
        <DashboardSidebar routes={props.routes} />
        <div className="p-4 xl:ml-72 relative">
          {hasRequestVideoConferenceId && <VCNotificationBanner />}
          <DashboardHeader />
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
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
