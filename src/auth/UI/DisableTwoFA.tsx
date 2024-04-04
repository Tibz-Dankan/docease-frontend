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
import { authenticate } from "../../store/actions/auth";

interface DisableTwoFAProps {
  twofaId: string;
}

export const DisableTwoFA: React.FC<DisableTwoFAProps> = (props) => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;
  const auth = useSelector((state: TAuthState) => state.auth);

  const { isLoading, mutate } = useMutation({
    mutationFn: disableTwoFA,
    onSuccess: (response: any) => {
      // TODO: to fix error 'read only error'
      auth.user!.twoFA = response?.data.twoFA;
      dispatch(authenticate(auth));

      dispatch(
        showCardNotification({ type: "success", message: response.message })
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
      <div
        className="full border-[1px] border-gray-300 rounded-md 
         p-4 relative h-28 text-gray-800"
      >
        <p>Two Factor Authentication is turned on for this account</p>
        {!isLoading && (
          <Button
            type="button"
            label="Turn off 2FA"
            onClick={() => disableTwoFAHandler()}
            className="absolute bottom-2 right-2 w-28 bg-gray-600"
          />
        )}
        {isLoading && (
          <div
            className="bg-gray-600 text-gray-50 flex items-center
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
