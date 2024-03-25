import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
  updateServerNotifications,
} from "../../store/actions/notification";
import { Loader } from "../../shared/UI/Loader";
import { getNotificationsByUser } from "../API";
import { NotificationList } from "../layout/NotificationList";

export const NotificationPage: React.FC = () => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;
  const userId = useSelector(
    (state: TAuthState) => state.auth.user?.userId
  ) as string;
  const dispatch: any = useDispatch();

  const { isLoading } = useQuery({
    queryKey: [`notifications-${userId}`],
    queryFn: () =>
      getNotificationsByUser({ userId: userId, accessToken: accessToken }),
    onSuccess: (response: any) => {
      dispatch(updateServerNotifications(response?.data?.notifications));
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />;
  }

  return (
    <Fragment>
      <div>
        <NotificationList />
      </div>
    </Fragment>
  );
};
