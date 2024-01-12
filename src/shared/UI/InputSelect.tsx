import React, { Fragment, ChangeEvent } from "react";

interface InputSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  formik?: any;
  options: any[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  name: string;
}

export const InputSelect: React.FC<InputSelectProps> = (props) => {
  const formik = props.formik;
  const options = props.options;
  const onChangeHandler = props.onChange;
  const label = props.label;
  const name = props.name;

  return (
    <Fragment>
      <div
        className="relative flex flex-col items-start 
         justify-center pt-4  gap-1 w-full"
      >
        {formik.errors[`${name}`] && formik.touched[`${name}`] && (
          <p className="absolute top-0 left-0 text-sm text-red-600">
            {formik.errors[`${name}`]}
          </p>
        )}
        <label htmlFor={label} className="text-gray-800">
          {label}
        </label>
        <select
          onChange={onChangeHandler}
          className="border-[1px] border-gray-400 focus:border-primary
          focus:bg-gray-200  transition-all outline-none p-2 rounded
          bg-gray-light-1 text-sm w-full"
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </Fragment>
  );
};
