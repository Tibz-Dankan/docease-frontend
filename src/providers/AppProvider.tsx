import React from "react";
import { ReduxProvider } from "./ReduxProvider";
import { AppThemeProvider } from "./ThemeProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

interface AppProvidersProps {
  children: JSX.Element;
}

export const AppProviders: React.FC<AppProvidersProps> = (props) => {
  return (
    <ReduxProvider>
      <AppThemeProvider>
        <ReactQueryProvider>{props.children}</ReactQueryProvider>
      </AppThemeProvider>
    </ReduxProvider>
  );
};
