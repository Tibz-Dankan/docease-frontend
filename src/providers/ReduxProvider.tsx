import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface ReduxProviderProps {
  children: JSX.Element;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = (props) => {
  return (
    <Fragment>
      <Provider store={store}>{props.children}</Provider>
    </Fragment>
  );
};
