import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoVideocam } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { clearRequestConnectVideoConference } from "../../store/actions/videoConference";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { TAuthState } from "../../types/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getVideoConferenceById } from "../API";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { TVideoConferenceConnectedState } from "../../types/videoConference";

export const VCNotificationBanner: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const user = useSelector((state: TAuthState) => state.auth.user!);
  const videoConference = useSelector(
    (state: TVideoConferenceConnectedState) => state.videoConference
  );
  const navigateToVideoConferencePage = (videoConfId: string) => {
    navigate(`/${user.role}/video-conferencing/${videoConfId}`, {
      replace: false,
    });
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: getVideoConferenceById,
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

  const getVideoConferenceByIdHandler = () => {
    const videoConferenceId = videoConference.requestConnectVideoConferenceId;

    if (!videoConferenceId) return;
    mutate({
      videoConferenceId: videoConferenceId,
      accessToken: accessToken,
    });
  };

  const closeBannerHandler = () => {
    dispatch(clearRequestConnectVideoConference());
  };

  return (
    <Fragment>
      <div
        className="flex items-center justify-center py-4 px-8
        bg-green-500 text-gray-50 gap-4 transition-all
         rounded w-full sticky top-16"
      >
        <span>
          <IconContext.Provider value={{ size: "1.8rem", color: "#fff" }}>
            <IoVideocam />
          </IconContext.Provider>
        </span>
        <span>{videoConference.requestConnectMessage}</span>
        <div>
          {!isLoading && (
            <div>
              <Button
                type="button"
                label="Join"
                className="w-20 shadow-sm"
                onClick={() => getVideoConferenceByIdHandler()}
              />
            </div>
          )}
          {isLoading && (
            <div
              className="w-20 py-2  rounded flex items-center 
              justify-center bg-primary shadow-sm"
            >
              <Loader className="w-6 h-6 stroke-gray-50" />
            </div>
          )}
        </div>
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => closeBannerHandler()}
        >
          <IconContext.Provider
            value={{
              size: "1.4rem",
              color: "#fff",
            }}
          >
            <IoClose />
          </IconContext.Provider>
        </span>
      </div>
    </Fragment>
  );
};
