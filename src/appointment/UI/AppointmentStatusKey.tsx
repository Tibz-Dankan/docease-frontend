import React from "react";
import { IconContext } from "react-icons";
import { GoDotFill } from "react-icons/go";

export const AppointmentStatusKey: React.FC = () => {
  return (
    <div
      className="text-gray-800 text-sm bg-gray-50 p-4 rounded-md
      shadow-md grid grid-cols-3"
    >
      <div className="w-full flex items-center justify-center gap-1">
        <span>
          <IconContext.Provider value={{ size: "1.2rem", color: "#37b24d" }}>
            <GoDotFill />
          </IconContext.Provider>
        </span>
        <span>Done</span>
      </div>
      <div className="w-full flex items-center justify-center gap-1">
        <span>
          <IconContext.Provider value={{ size: "1.2rem", color: "#15aabf" }}>
            <GoDotFill />
          </IconContext.Provider>
        </span>
        <span>On going</span>
      </div>
      <div className="w-full flex items-center justify-center gap-1">
        <span>
          <IconContext.Provider value={{ size: "1.2rem", color: "#228be6" }}>
            <GoDotFill />
          </IconContext.Provider>
        </span>
        <span>Upcoming</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <span>
          <IconContext.Provider value={{ size: "1.2rem", color: "#868e96" }}>
            <GoDotFill />
          </IconContext.Provider>
        </span>
        <span>Approval pending</span>
      </div>
      <div className="flex items-center justify-center gap-1">
        <span>
          <IconContext.Provider value={{ size: "1.2rem", color: "#e64980" }}>
            <GoDotFill />
          </IconContext.Provider>
        </span>
        <span>Missed</span>
      </div>
      <div className="w-full flex items-center justify-center gap-1">
        <span>
          <IconContext.Provider value={{ size: "1.2rem", color: "#fa5252" }}>
            <GoDotFill />
          </IconContext.Provider>
        </span>
        <span>Cancelled</span>
      </div>
    </div>
  );
};
