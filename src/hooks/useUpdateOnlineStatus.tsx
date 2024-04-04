import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TAuthState } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { updateOnlineStatus } from "../onlineStatus/API";

export const useUpdateOnlineStatus = () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken as string
  );
  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;

  const { mutate } = useMutation({
    mutationFn: updateOnlineStatus,
    onSuccess: (_: any) => {},
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userId || !accessToken) return;

    const intervalId = setInterval(() => {
      updateOnlineStatusHandler();
    }, 60000);

    const updateOnlineStatusHandler = () => {
      mutate({ userId: userId, accessToken: accessToken });
    };

    updateOnlineStatusHandler();

    return () => clearInterval(intervalId);
  }, [userId, accessToken, mutate]);

  return {};
};
