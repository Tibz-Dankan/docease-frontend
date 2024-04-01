import React, { Fragment } from "react";

interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  formik?: any;
  label: string;
  name: string;
  type: "text" | "password" | "email" | "number" | "date" | "time";
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const formik = props.formik;
  const label = props.label;
  const name = props.name;

  return (
    <Fragment>
      <div
        className="relative pt-4 flex flex-col items-start 
         justify-center gap-1 w-full text-gray-800"
      >
        {formik.errors[`${name}`] && formik.touched[`${name}`] && (
          <p className="absolute top-0 left-0 text-sm text-red-600">
            {formik.errors[`${name}`]}
          </p>
        )}
        <label className="text-sm first-letter:uppercase font-[500]">
          {label}
        </label>
        <input
          type={props.type}
          id={name}
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values[`${name}`]}
          className="p-2 outline-none rounded border-[1px]
           border-gray-500 focus:border-[1px] focus:border-primary
           transition-all text-sm w-full focus:outline-none 
           focus:shadow-[0px_0px_0px_4px_rgba(28,126,214,0.3)]
           text-gray-800"
        />
      </div>
    </Fragment>
  );
};
