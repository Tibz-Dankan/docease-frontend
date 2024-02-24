import { useDispatch, useSelector } from "react-redux";
import {
  hideCardNotification,
  showCardNotification,
} from "../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { TReloadState } from "../types/reload";
import { clearReload } from "../store/actions/reload";
// import { useEffect } from "react";

export const useReload = (mutateFn: any, mutateObject: any, entity: string) => {
  // export const useReload = (
  //   queryFn: any,
  //   queryKey: any,
  //   entity: string
  // ): { isLoading: boolean; data: any } => {
  const reload = useSelector((state: TReloadState) => state.reload);

  const dispatch: any = useDispatch();
  const { isLoading, data, mutate } = useMutation({
    mutationFn: mutateFn,
    onSuccess: (response: any) => {
      console.log(response);
      dispatch(clearReload());
    },
    onError: (error: any) => {
      dispatch(clearReload());
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const reloadHandler = () => {
    const isReloading = reload.isReloading;
    const isMatchingEntity = reload.entity === entity;

    if (!isReloading || !isMatchingEntity) {
      return;
    }
    console.log("reloading for entity: ", entity);
    mutate(mutateObject);

    return data;
  };

  // useEffect(() => {

  //   reloadHandler();
  // }, [reload.isReloading, reload.entity]);

  //   const isReloading = reload.isReloading;
  //   const isMatchingEntity = reload.entity === entity;

  //   if (!isReloading || !isMatchingEntity) {
  //     return { isLoading: false, data: null };
  //   }
  //   console.log("In the reload hook");

  //   const { isLoading, data } = useQuery({
  //     // queryKey: [`schedules-${user?.userId}`],
  //     // queryFn: () => getScheduleByUser({ userId: user?.userId!, token: token }),
  //     queryKey: [`${queryKey}`],
  //     queryFn: () => queryFn,
  //     onSuccess(response: any) {
  //       console.log(response);
  //       dispatch(clearReload());
  //     },
  //     onError: (error: any) => {
  //       dispatch(clearReload());

  //       dispatch(showCardNotification({ type: "error", message: error.message }));
  //       setTimeout(() => {
  //         dispatch(hideCardNotification());
  //       }, 5000);
  //     },
  //   });

  return { isLoading, data, reloadHandler };
};
