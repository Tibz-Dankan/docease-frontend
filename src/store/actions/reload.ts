import { reloadActions } from "../index";

export const startScheduleReload = () => {
  return (dispatch: any) => {
    dispatch(reloadActions.startScheduleReload());
  };
};

export const stopScheduleReload = () => {
  return (dispatch: any) => {
    dispatch(reloadActions.stopScheduleReload());
  };
};
