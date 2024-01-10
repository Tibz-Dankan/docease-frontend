import React, { ReactNode } from "react";
import PropTypes from "prop-types";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

interface Action {
  type: string;
  value: string;
}

export function reducer(state: any, action: Action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

interface MTailwindControllerProviderProps {
  children: ReactNode;
}

export const MaterialTailwindControllerProvider: React.FC<
  MTailwindControllerProviderProps
> = ({ children }) => {
  const initialState = {
    openSidenav: false,
    sidenavColor: "#d1d5db",
    sidenavType: "dark",
    // transparentNavbar: true,
    fixedNavbar: false,
  };

  const [controller, dispatch] = React.useReducer<any>(reducer, initialState);
  const value: any = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
};

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch: any, value: boolean) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch: any, value: boolean) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch: any, value: boolean) =>
  dispatch({ type: "SIDENAV_COLOR", value });
// export const setTransparentNavbar = (dispatch: any, value: boolean) =>
//   dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch: any, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });
