import { authActions } from "../index";
import { TAuth } from "../../types/auth";

export const logOut = () => {
  localStorage.clear();
  return async (dispatch: any) => {
    await dispatch(authActions.logout());
  };
};

export const authenticate = (auth: TAuth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
  return async (dispatch: any) => {
    await dispatch(authActions.authenticate(auth));
  };
};
