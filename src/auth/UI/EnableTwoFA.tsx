import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enableTwoFA } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";

export const EnableTwoFA: React.FC = () => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId!
  ) as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: enableTwoFA,
    onSuccess: (response: any) => {
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 10000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const enableTwoFAHandler = () => {
    if (!userId) return;

    mutate({
      userId: userId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div
        className="full border-[1px] border-gray-300 rounded-md 
         p-4 relative h-28 text-gray-800"
      >
        <p>Turn on Two Factor Authentication to secure your account</p>
        {!isLoading && (
          <Button
            type="button"
            label="Turn on 2FA"
            onClick={() => enableTwoFAHandler()}
            className="absolute bottom-2 right-2 w-28"
          />
        )}
        {isLoading && (
          <div
            className="bg-primary text-gray-50 flex items-center
             justify-center rounded absolute bottom-2 right-2 w-24 
             py-1 px-2"
          >
            <Loader className="w-8 h-8" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
