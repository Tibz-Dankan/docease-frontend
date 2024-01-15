import React, { Fragment, useState, ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { IconContext } from "react-icons";
import { Loader } from "./Loader";

export const SearchApp: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const isLoading = false;

  const searchInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(() => event.target.value);
  };

  const searchHandler = () => {
    // TODO: make api call here
  };

  return (
    <Fragment>
      <div
        className="relative flex flex-col items-start 
         justify-center gap-1 w-[90%] sm:w-72"
      >
        {!isLoading && (
          <span
            onClick={searchHandler}
            className="cursor-pointer absolute top-1 right-2"
          >
            <IconContext.Provider value={{ size: "1.8rem", color: "#42968D" }}>
              <CiSearch />
            </IconContext.Provider>
          </span>
        )}
        {isLoading && (
          <span
            className="cursor-pointer absolute top-[5px] right-2
           bg-primary p-1 rounded transition-all"
          >
            <Loader className="w-5 h-5" />
          </span>
        )}
        <input
          type="text"
          onChange={searchInputChangeHandler}
          value={searchInput}
          className="p-2 outline-none rounded border-[1px]
           border-gray-500 focus:bg-gray-200
           transition-all text-sm w-full outline"
        />
      </div>
    </Fragment>
  );
};
