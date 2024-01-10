import React, { Fragment, ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { Footer } from "./Footer";

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

export const DashLayout: React.FC<DashLayoutProps> = (props) => {
  return (
    <Fragment>
      <div className="w-full min-h-screen">
        <div>
          <DashboardSidebar routes={props.routes} />
        </div>
        <div>
          <div>
            <DashboardHeader />
          </div>
          <main>{props.children}</main>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
