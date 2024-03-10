import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableTwoFA } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";

interface DisableTwoFAProps {
  twofaId: string;
}

export const DisableTwoFA: React.FC<DisableTwoFAProps> = (props) => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { isLoading, mutate } = useMutation({
    mutationFn: disableTwoFA,
    onSuccess: (response: any) => {
      dispatch(
        showCardNotification({ type: "error", message: response.message })
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

  const disableTwoFAHandler = () => {
    const twofaId = props.twofaId;
    if (!twofaId) return;

    mutate({
      twofaId: twofaId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div>
        {!isLoading && (
          <Button
            type="button"
            label="Turn OFF 2FA"
            onClick={() => disableTwoFAHandler()}
            className="text-[12px] w-14 p-1"
          />
        )}
        {isLoading && (
          <div
            className="bg-primary text-gray-50 flex items-center
            justify-center rounded w-14 px-1 py-[6px]"
          >
            <Loader className="w-5 h-5" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
