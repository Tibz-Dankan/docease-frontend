import React, { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";

interface MedicalLayoutProps {
  children: ReactNode;
}

export const MedicalLayout: React.FC<MedicalLayoutProps> = (props) => {
  const getLastWordFromUrl = (): string => {
    const url = window.location.pathname;
    const segments = url.split("/");
    return segments[segments.length - 1];
  };

  const lastWord = getLastWordFromUrl();
  const isFormMedicalHistoryRoute = lastWord === "form";
  // const isFormMedicalHistoryRoute = lastWord === "files";

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
             text-gray-700 -mt-4 text-sm bg-green-500s"
          >
            <div
              className="inline-block px-6 py-3 space-x-8
              bg-gray-300 rounded-md my-2"
            >
              <span
                className={`${
                  !isFormMedicalHistoryRoute &&
                  "bg-white px-4 py-1 text-center rounded-md"
                }`}
              >
                <Link
                  to="/patient/medical-history/files"
                  className={`${
                    !isFormMedicalHistoryRoute && "text-primary font-semibold"
                  }`}
                >
                  Files
                </Link>
              </span>
              <span
                className={`${
                  isFormMedicalHistoryRoute &&
                  "bg-white px-4 py-1 text-center rounded-md"
                }`}
              >
                <Link
                  to="/patient/medical-history/form"
                  className={`${
                    isFormMedicalHistoryRoute && "text-primary font-semibold"
                  }`}
                >
                  Form
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div>{props.children}</div>
      </div>
    </Fragment>
  );
};
