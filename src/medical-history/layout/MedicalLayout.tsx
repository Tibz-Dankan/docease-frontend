import React, { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";

interface MedicalLayoutProps {
  children: ReactNode;
}

export const MedicalLayout: React.FC<MedicalLayoutProps> = (props) => {
  return (
    <Fragment>
      <div className="p-8 bg-white rounded-md">
        <div className="flex flex-col justify-center">
          <div
            className="flex items-center justify-center 
             border-b-[1px]s border-gray-300 p-2 -mt-6 text-lg
             text-gray-800 font-semibold"
          >
            <p>Medical History</p>
          </div>
          <div
            className="flex items-center justify-center 
             border-b-[1px] border-gray-300 p-2 gap-8
             text-gray-700 -mt-4 text-sm"
          >
            <span>
              <Link
                to="/patient/medical-history/files"
                className="text-primary"
              >
                Files
              </Link>
            </span>
            <span>
              <Link to="/patient/medical-history/form">Form</Link>
            </span>
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </Fragment>
  );
};
