import React, { Fragment } from "react";
import { Button } from "../../shared/UI/Button";

import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { confirmTwoFA } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { Modal } from "../../shared/UI/Modal";

interface ConfirmTwoFAProps {
  twofaId: string;
}

export const ConfirmTwoFA: React.FC<ConfirmTwoFAProps> = (props) => {
  const auth = useSelector((state: TAuthState) => state.auth);
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: confirmTwoFA,
    onSuccess: (response: any) => {
      console.log("response--->", response);
      dispatch(
        showCardNotification({
          type: "success",
          message: response.message,
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const confirmTwoFAHandler = () => {
    const twofaId = props.twofaId;
    const accessToken = auth.accessToken as string;

    if (!twofaId) return;

    mutate({
      twofaId: twofaId,
      accessToken: accessToken,
    });
  };
  return (
    <Fragment>
      <Modal
        openModalElement={
          <div className="flex items-center justify-center">
            <Button
              label="Confirm 2FA"
              type="button"
              onClick={() => confirmTwoFAHandler()}
              className="bg-primary text-white"
            />
          </div>
        }
        className=""
      >
        <div
          className="p-8  w-[90%] sm:w-[400px] h-[90vh]
          md:h-auto flex-col gap-4 text-gray-800 
          space-y-4"
        >
          <div
            className="w-full flex items-center justify-center
            border-b-[1px] border-gray-300 pb-4"
          >
            <p className="text-primary text-xl text-center">Confirm 2FA</p>
          </div>

          <div className="flex flex-col gap-4">
            <p
              className="space-x-2 text-center border-b-[1px]
              border-gray-300 pb-4"
            >
              <span>
                Provide token sent to either telephone number or email to
                complete setting up{" "}
                <span className="font-semibold">
                  Two(2) Factor Authentication
                </span>{" "}
                for your account
              </span>
            </p>
            <div className="mt-2">
              {!isLoading && (
                <Button
                  label="Confirm"
                  type="button"
                  onClick={() => confirmTwoFAHandler()}
                  className="bg-primary text-white"
                />
              )}
              {isLoading && (
                <div
                  className="bg-primary text-primary flex 
                   items-center justify-center p-1 w-full rounded"
                >
                  <Loader className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
