import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons";
import { GoTriangleDown } from "react-icons/go";

interface InputSelectOverlayProps {
  onClose: () => void;
}
const InputSelectOverlay: React.FC<InputSelectOverlayProps> = (props) => {
  return (
    <Fragment>
      <div
        onClick={props.onClose}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50"
      />
    </Fragment>
  );
};

interface GenderSelectProps {
  defaultGender?: string;
  onSelect: (gender: string) => void;
}

export const GenderSelect: React.FC<GenderSelectProps> = (props) => {
  const [showGenderList, setShowGenderList] = useState<boolean>(false);
  const [gender, setGender] = useState<string>(props.defaultGender!);

  const onSelectHandler = (gender: string) => {
    props.onSelect(gender);
    setGender(() => gender);
    setShowGenderList(() => false);
  };

  const hasSelectedGender: boolean = !!gender;

  const genders = ["male", "female"];

  return (
    <Fragment>
      <div className="w-full min-w-28 flex flex-col justify-center relative">
        <div
          className="border-gray-600 rounded-t flex
           items-center justify-between p-2 bg-gray-300 text-sm"
          onClick={() => setShowGenderList(() => !showGenderList)}
        >
          {!hasSelectedGender && (
            <span className="text-gray-800">Select Gender</span>
          )}
          {hasSelectedGender && (
            <span className="text-gray-800 first-letter:uppercase">
              {gender}
            </span>
          )}
          <span className="inline-block cursor-pointer">
            <IconContext.Provider value={{ size: "1.2rem", color: "#868e96" }}>
              <GoTriangleDown />
            </IconContext.Provider>
          </span>
        </div>
        <div className="bottom-[0.5px] h-[2px] bg-gray-400 x-10" />
        {showGenderList && (
          <ul
            className="animate-opacityZeroToFull absolute top-[38px] w-full
              bg-gray-50 z-[60] shadow-2xl p-4 rounded-b border-[1px]
              border-gray-300 space-y-2 max-h-60 overflow-x-hidden"
          >
            {genders.map((gender, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => onSelectHandler(gender)}
                  className="cursor-pointer text-gray-800 text-sm
                  first-letter:uppercase"
                >
                  {gender}
                </li>
              );
            })}
          </ul>
        )}
        {showGenderList && (
          <InputSelectOverlay onClose={() => setShowGenderList(() => false)} />
        )}
      </div>
    </Fragment>
  );
};
