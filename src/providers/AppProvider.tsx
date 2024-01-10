import React from "react";
import { ReduxProvider } from "./ReduxProvider";
import { AppThemeProvider } from "./ThemeProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { MaterialTailwindControllerProvider } from "../context";

interface AppProvidersProps {
  children: JSX.Element;
}

export const AppProviders: React.FC<AppProvidersProps> = (props) => {
  return (
    <ReduxProvider>
      <AppThemeProvider>
        <ReactQueryProvider>
          <MaterialTailwindControllerProvider>
            {props.children}
          </MaterialTailwindControllerProvider>
        </ReactQueryProvider>
      </AppThemeProvider>
    </ReduxProvider>
  );
};
