import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size: string;
  bgColor?: string;
  borderColor?: string;
  applyShadow?: boolean;
}

const FilledDot: React.FC<DotsProps> = (props) => {
  const size = props.size;
  const bgColor = props.bgColor;

  return (
    <Fragment>
      <div className={`${size} ${bgColor} rounded-[50%]`} />
    </Fragment>
  );
};

const NonFilledDot: React.FC<DotsProps> = (props) => {
  const size = props.size;
  const borderColor = props.borderColor;
  const applyShadow: boolean = props.applyShadow!;

  return (
    <Fragment>
      <div
        className={`${size} rounded-[50%]
        border-[1px] ${borderColor} ${applyShadow && "shadow-md"}`}
      />
    </Fragment>
  );
};

interface SquareDotsProps {
  filled: boolean;
  size: string; // w-52 h-52
  bgColor?: string; //bg-gray-400
  borderColor?: string; //border-gray-400
  className?: string;
  gap: string; //gap-4
  applyShadow?: boolean; //true/false
}

export const SquareDots: React.FC<SquareDotsProps> = (props) => {
  const dots = (): number[] => {
    const dotsArray: number[] = [];
    for (let i: number = 1; i <= 25; i++) {
      dotsArray.push(i);
    }

    return dotsArray;
  };

  const filled: boolean = props.filled;
  const size: string = props.size;
  const bgColor: string = props.bgColor!;
  const borderColor = props.borderColor;
  const gap = props.gap;

  return (
    <Fragment>
      <div className={twMerge(`grid grid-cols-5 ${gap}`, props.className)}>
        {dots().map((_, index) => {
          if (filled) {
            return <FilledDot key={index} size={size} bgColor={bgColor} />;
          }
          return (
            <NonFilledDot
              key={index}
              size={size}
              borderColor={borderColor}
              applyShadow={props.applyShadow}
            />
          );
        })}
      </div>
    </Fragment>
  );
};
