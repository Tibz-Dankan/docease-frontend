import { sidebarActions } from "../index";

export const openSidebarHandler = () => {
  return async (dispatch: any) => {
    await dispatch(sidebarActions.openSidebar());
  };
};

export const closeSidebarHandler = () => {
  return async (dispatch: any) => {
    await dispatch(sidebarActions.closeSidebar());
  };
};
