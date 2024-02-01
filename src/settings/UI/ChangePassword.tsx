import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { updatePassword } from "../API";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";

export const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;
  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;

  const currentPasswordChangeHandler = (event: any) =>
    setCurrentPassword(() => event.target.value);
  const newPasswordChangeHandler = (event: any) =>
    setNewPassword(() => event.target.value);
  const confirmNewPasswordChangeHandler = (event: any) =>
    setConfirmNewPassword(() => event.target.value);

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (response: any) => {
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

  const changePasswordHandler = async (event: any) => {
    event.preventDefault();
    if (
      !currentPassword ||
      !newPassword ||
      newPassword !== confirmNewPassword
    ) {
      console.log("form has errors");
      return;
    }
    mutate({
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword,
      accessToken: accessToken,
    });
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <form
        onSubmit={changePasswordHandler}
        className="w-[80%] h-fulls space-y-4
           bg-gray-50 rounded-md p-12"
      >
        <div className="flex flex-col justify-center gap-[6px]">
          <label htmlFor="Full Name" className="text-gray-800 text-sm">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={currentPasswordChangeHandler}
            placeholder="Enter current password"
            required
            className="w-full p-3 px-4 rounded placeholder:text-gray-500
              focus:border-primary  focus:border-[1px] outline-none 
              transition-all border-[1px] border-gray-300 border-b-[3px] 
              shadow-sm"
          />
        </div>
        <div className="flex flex-col justify-center gap-[6px]">
          <label htmlFor="Full Name" className="text-gray-800 text-sm">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={newPasswordChangeHandler}
            placeholder="Enter new password"
            required
            className="w-full p-3 px-4 rounded placeholder:text-gray-500
                focus:border-primary  focus:border-[1px] outline-none 
                transition-all border-[1px] border-gray-300 border-b-[3px] 
                shadow-sm"
          />
        </div>
        <div className="flex flex-col justify-center gap-[6px]">
          <label htmlFor="Full Name" className="text-gray-800 text-sm">
            Confirm New password
          </label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={confirmNewPasswordChangeHandler}
            placeholder="Confirm new password"
            required
            className="w-full p-3 px-4 rounded placeholder:text-gray-500
                focus:border-primary  focus:border-[1px] outline-none 
                transition-all border-[1px] border-gray-300 border-b-[3px] 
                shadow-sm"
          />
        </div>
        <div className="flex items-center justify-start pt-6">
          {!isLoading && <Button label="Change" type="submit" />}
          {isLoading && <Loader />}
        </div>
      </form>
    </div>
  );
};
