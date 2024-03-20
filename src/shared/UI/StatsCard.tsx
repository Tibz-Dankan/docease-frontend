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
  countClassName?: string;
  titleClassName?: string;
  iconColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = (props) => {
  const iconColor = props.iconColor ? props.iconColor : "#1c7ed6";

  return (
    <Fragment>
      <Link to={props.link}>
        <div
          className={twMerge(
            `p-4 space-y-2 shadow rounded-sm relative border-[1px]
           border-gray-200 bg-gray-50`,
            props.className
          )}
        >
          <p className={twMerge(`text-gray-700`, props.titleClassName)}>
            {props.title}
          </p>
          <p
            className={twMerge(
              `text-primary font-semibold text-2xl`,
              props.countClassName
            )}
          >
            {props.count}
          </p>
          <span className="absolute top-2 right-2">
            <IconContext.Provider value={{ size: "1.4rem", color: iconColor }}>
              <FiChevronRight />
            </IconContext.Provider>
          </span>
        </div>
      </Link>
    </Fragment>
  );
};
