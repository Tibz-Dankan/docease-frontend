import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { MdOutlinePassword } from "react-icons/md";

export const ChangePasswordDescription: React.FC = () => {
  return (
    <Fragment>
      <div
        className="w-full md:w-64 md:min-w-64  p-4 space-y-4 bg-white rounded-md
         border-2 border-primary"
      >
        <div
          className="flex items-center justify-center gap-3 
           border-b-[1px] border-gray-400 pb-3"
        >
          <span
            className="cursor-pointer grid place-items-center 
            bg-gray-300 p-1 w-10 h-10 rounded-[50%]"
          >
            <IconContext.Provider value={{ size: "1.2rem", color: "#495057" }}>
              <MdOutlinePassword />
            </IconContext.Provider>
          </span>
          <span className="font-semibold text-gray-700 text-lg">
            Change Password
          </span>
        </div>
        <div className="text-gray-700 space-y-2">
          <p>
            Existing Password Verification: Provide your current password for
            security.
          </p>
          <p>New Password Selection: Choose a strong, unique password.</p>
          <p>Confirmation: Re-enter the new password for accuracy.</p>
        </div>
      </div>
    </Fragment>
  );
};
