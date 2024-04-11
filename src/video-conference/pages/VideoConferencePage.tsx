import React, { Fragment } from "react";
import { VideoConference } from "../layout/VideoConference";
import { updateVideoConference } from "../../store/actions/videoConference";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TAuthState } from "../../types/auth";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getVideoConferenceById } from "../API";
import { useParams } from "react-router-dom";

export const VideoConferencePage: React.FC = () => {
  const dispatch: any = useDispatch();

  const { videoConferenceId } = useParams();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const { isLoading } = useQuery({
    queryKey: [`/video-conf-${videoConferenceId}`],
    queryFn: () =>
      getVideoConferenceById({
        videoConferenceId: videoConferenceId!,
        accessToken: accessToken,
      }),
    onSuccess: (response: any) => {
      console.log("response->", response);
      dispatch(updateVideoConference(response.data.conference));
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });
  return (
    <Fragment>
      <div className="w-full h-auto">
        {/* TODO: to create a more customized loader */}
        {isLoading && <div>IsLoading....</div>}
        <VideoConference />
      </div>
    </Fragment>
  );
};
