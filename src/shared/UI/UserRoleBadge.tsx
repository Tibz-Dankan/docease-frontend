import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { IconContext } from "react-icons";
import { LiaClinicMedicalSolid } from "react-icons/lia";
import { LuStethoscope } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const UserRoleBadge: React.FC = () => {
  const userRole = useSelector((state: TAuthState) => state.auth.user?.role!);

  const isPatient = userRole === "patient";
  const isDoctor = userRole === "doctor";
  const isAdmin = userRole === "admin";
  return (
    <Fragment>
      <div>
        {isPatient && (
          <li
            className="bg-blue-50 flex items-center justify-center
             my-4 rounded-md px-2 py-2 gap-4"
          >
            <div className="flex items-start justify-center gap-4 text-blue-800">
              <span>
                <IconContext.Provider
                  value={{ size: "2.8rem", color: "#1971c2" }}
                >
                  <LiaClinicMedicalSolid />
                </IconContext.Provider>
              </span>
              <p className="flex flex-col items-start text-sm font-semibold">
                <span className="uppercase">Patient</span>
                <span className="uppercase">Account</span>
              </p>
            </div>
          </li>
        )}
        {isDoctor && (
          <li
            className="bg-green-50 flex items-center justify-center
             my-4 rounded-md px-2 py-2 gap-4"
          >
            <div className="flex items-start justify-center gap-4 text-green-700">
              <span>
                <IconContext.Provider
                  value={{ size: "2.4rem", color: "#2f9e44" }}
                >
                  <LuStethoscope />
                </IconContext.Provider>
              </span>
              <p className="flex flex-col items-start text-sm font-semibold">
                <span className="uppercase">Doctor</span>
                <span className="uppercase">Account</span>
              </p>
            </div>
          </li>
        )}
        {isAdmin && (
          <li
            className="bg-red-50 flex items-center justify-center
             my-4 rounded-md px-2 py-2 gap-4"
          >
            <div className="flex items-start justify-center gap-4 text-red-800">
              <span>
                <IconContext.Provider
                  value={{ size: "2.8rem", color: "#e03131" }}
                >
                  <MdOutlineAdminPanelSettings />
                </IconContext.Provider>
              </span>
              <p className="flex flex-col items-start text-sm font-semibold">
                <span className="uppercase">Admin</span>
                <span className="uppercase">Account</span>
              </p>
            </div>
          </li>
        )}
      </div>
    </Fragment>
  );
};
