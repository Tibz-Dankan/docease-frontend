import { modalActions } from "../index";

export const onOpenModal = () => {
  return (dispatch: any) => {
    dispatch(modalActions.onOpenModal());
  };
};

export const onCloseModal = () => {
  return (dispatch: any) => {
    dispatch(modalActions.onCloseModal());
  };
};
