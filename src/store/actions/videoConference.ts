import { videoConferenceActions } from "..";
import { TVideoConference } from "../../types/videoConference";

export const updateVideoConference = (videoConference: TVideoConference) => {
  return async (dispatch: any) => {
    await dispatch(videoConferenceActions.update(videoConference));
  };
};

export const updateVideoConferenceConnected = () => {
  return async (dispatch: any) => {
    await dispatch(videoConferenceActions.updateConnected());
  };
};

export const clearVideoConference = () => {
  return async (dispatch: any) => {
    await dispatch(videoConferenceActions.clear());
  };
};
