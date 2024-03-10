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
         justify-center gap-1 w-full"
      >
        {formik.errors[`${name}`] && formik.touched[`${name}`] && (
          <p className="absolute top-0 left-0 text-sm text-red-600">
            {formik.errors[`${name}`]}
          </p>
        )}
        <label className="text-sm first-letter:uppercase">{label}</label>
        <input
          type={props.type}
          id={name}
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values[`${name}`]}
          className="p-2 outline-none rounded border-[1px]
           border-gray-500 focus:border-[2px] focus:border-primary
           transition-all text-sm w-full"
        />
      </div>
    </Fragment>
  );
};
