import React, { Fragment } from "react";
import { ThemeProvider } from "@material-tailwind/react";

interface AppThemeProviderProps {
  children: JSX.Element;
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = (props) => {
  return (
    <Fragment>
      <ThemeProvider>{props.children}</ThemeProvider>
    </Fragment>
  );
};
