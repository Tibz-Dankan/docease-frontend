import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendEnableTwoFA } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";

export const ResendEnableTwo: React.FC = () => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId!
  ) as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: resendEnableTwoFA,
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

  const resendEnableTwoFAHandler = () => {
    if (!userId) return;

    mutate({
      userId: userId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div className="w-full flex items-center justify-end gap-2">
        <p>Did receive token?</p>
        {!isLoading && (
          <Button
            label="Resend token"
            type="submit"
            className="w-32 bg-transparent text-primary
            hover:underline focus:underline -ml-4"
            onClick={() => resendEnableTwoFAHandler()}
          />
        )}
        {isLoading && (
          <div
            className="w-32 bg-primary text-primary flex 
            items-center justify-center p-1 rounded mr-3 "
          >
            <Loader className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
