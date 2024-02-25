import React, { Fragment, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";

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

interface InputSelectProps {
  label: string;
  options: any[];
  onSelect: (value: any) => void;
  showOptionList: boolean;
}

/**
 * Acceptable optionList format [{name:"name",...},{name:"name",...}]
 */
export const InputSelectField: React.FC<InputSelectProps> = (props) => {
  const optionList = props.options;
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [showOptionList, setShowOptionList] = useState<boolean>(
    props.showOptionList ? props.showOptionList : false
  );

  const onSelectHandler = (value: any) => {
    props.onSelect(value);
    setSelectedValue(() => value);
  };

  return (
    <Fragment>
      <div className="w-full flex flex-col justify-center relative">
        <div
          className="border-gray-600 rounded-t flex
              items-center justify-between p-2 bg-gray-300 text-sm"
          onClick={() => setShowOptionList(!showOptionList)}
        >
          {!!selectedValue && <span>{selectedValue.name}</span>}
          {!selectedValue && (
            <span className="text-gray-800">{props.label}</span>
          )}
          <svg className="w-6 h-6 fill-gray-700 cursor-pointer">
            <use href={`${sprite}#icon-chevron-down`}></use>
          </svg>
        </div>
        <div className="bottom-[0.5px] h-[2px] bg-gray-400 x-10" />
        {showOptionList && (
          <div
            className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
             animate-radiate z-40"
          />
        )}

        {showOptionList && (
          <ul
            className="animate-opacityZeroToFull absolute top-[42px] w-full
              bg-gray-100 z-[60] shadow-2xl p-2s p-4 rounded-b border-[1px]
              border-gray-300 space-y-2 max-h-60 overflow-x-hidden"
          >
            {optionList.map((option: any, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => onSelectHandler(option)}
                  className="cursor-pointer"
                >
                  {option.name}
                </li>
              );
            })}
          </ul>
        )}
        {showOptionList && (
          <InputSelectOverlay onClose={() => setShowOptionList(false)} />
        )}
      </div>
    </Fragment>
  );
};
