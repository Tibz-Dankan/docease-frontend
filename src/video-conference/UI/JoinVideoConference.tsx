import { useMutation } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { joinVideoConference } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import { useNavigate } from "react-router-dom";

interface JoinVideoConferenceProps {
  videoConferenceId: string;
}

export const JoinVideoConference: React.FC<JoinVideoConferenceProps> = (
  props
) => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const userRole = useSelector(
    (state: TAuthState) => state.auth.user?.role!
  ) as string;

  const navigate = useNavigate();

  const navigateToVideoConferencePage = (videoConfId: string) => {
    navigate(`/${userRole}/video-conferencing/${videoConfId}`, {
      replace: false,
    });
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: joinVideoConference,
    onSuccess: (response: any) => {
      navigateToVideoConferencePage(
        response?.data?.conference?.videoConferenceId
      );
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const joinVideoConferenceHandler = () => {
    const videoConferenceId = props.videoConferenceId;

    if (!videoConferenceId) return;
    mutate({
      videoConferenceId: videoConferenceId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div>
        {!isLoading && (
          <div>
            <Button
              type="button"
              label="Join"
              onClick={() => joinVideoConferenceHandler()}
              className="w-20"
            />
          </div>
        )}
        {isLoading && (
          <div
            className="w-20 py-2  rounded flex items-center 
             justify-center bg-primary"
          >
            <Loader className="w-6 h-6 stroke-gray-50" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
