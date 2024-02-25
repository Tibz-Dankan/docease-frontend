import { TReload } from "../../types/reload";
import { reloadActions } from "../index";

export const updateReload = (reload: TReload) => {
  return (dispatch: any) => {
    dispatch(reloadActions.updateReload(reload));
  };
};

export const clearReload = () => {
  return (dispatch: any) => {
    dispatch(reloadActions.clearReload());
  };
};
