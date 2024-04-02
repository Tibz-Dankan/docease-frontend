import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  formik?: any;
  label: string;
  name: string;
  type: "text" | "password" | "email" | "number" | "date" | "time";
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const formik = props.formik;
  const label = props.label;
  const name = props.name;
  const placeholder = props.placeholder ? props.placeholder : "";

  const isPasswordField: boolean = props.type === "password";
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showPasswordHandler = () => setShowPassword(() => !showPassword);

  const getFieldType = (): string => {
    if (isPasswordField && showPassword) return "text";
    return props.type;
  };

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
        <div className="w-full relative">
          <input
            type={getFieldType()}
            id={name}
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[`${name}`]}
            placeholder={placeholder}
            className="p-2 outline-none rounded border-[1px]
             border-gray-500 focus:border-[1px] focus:border-primary
             transition-all text-sm w-full focus:outline-none 
             focus:shadow-[0px_0px_0px_4px_rgba(28,126,214,0.3)]
             text-gray-800"
          />
          {isPasswordField && (
            <div className="inline-block absolute right-2 top-[7px]">
              {!showPassword && (
                <span
                  className="cursor-pointer"
                  onClick={() => showPasswordHandler()}
                >
                  <IconContext.Provider
                    value={{
                      size: "1.4rem",
                      color: "#495057",
                    }}
                  >
                    <PiEyeLight />
                  </IconContext.Provider>
                </span>
              )}
              {showPassword && (
                <span
                  className="cursor-pointer"
                  onClick={() => showPasswordHandler()}
                >
                  <IconContext.Provider
                    value={{
                      size: "1.4rem",
                      color: "#495057",
                    }}
                  >
                    <PiEyeSlashLight />
                  </IconContext.Provider>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
