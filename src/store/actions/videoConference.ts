import { videoConferenceActions } from "..";
import { TVideoConference } from "../../types/videoConference";

export const updateVideoConference = (videoConference: TVideoConference) => {
  return async (dispatch: any) => {
    await dispatch(videoConferenceActions.update(videoConference));
  };
};

export const updateVideoConferenceConnected = (peerId: string) => {
  return async (dispatch: any) => {
    await dispatch(
      videoConferenceActions.updateConnected({ connectPeerId: peerId })
    );
  };
};

export const clearVideoConference = () => {
  return async (dispatch: any) => {
    await dispatch(videoConferenceActions.clear());
  };
};
