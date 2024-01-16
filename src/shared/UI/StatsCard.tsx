import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

interface StatsCardProps {
  title: string;
  count: number;
  link: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = (props) => {
  return (
    <Fragment>
      <div
        className={twMerge(
          `p-4 space-y-2 shadow rounded-sm relative border-[1px]
           border-gray-200 bg-gray-50`,
          props.className
        )}
      >
        <p className="text-gray-700">{props.title}</p>
        <p className="text-primary font-semibold text-2xl">{props.count}</p>
        <Link to={props.link} className="absolute top-2 right-2">
          <IconContext.Provider value={{ size: "1.4rem", color: "#42968D" }}>
            <FiChevronRight />
          </IconContext.Provider>
        </Link>
      </div>
    </Fragment>
  );
};
