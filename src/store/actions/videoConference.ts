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

export const updateRequestConnectVideoConference = (
  requestConnectVideoConferenceId: string,
  requestConnectMessage: string
) => {
  return async (dispatch: any) => {
    await dispatch(
      videoConferenceActions.updateRequestConnectVideoConference({
        requestConnectVideoConferenceId: requestConnectVideoConferenceId,
        requestConnectMessage: requestConnectMessage,
      })
    );
  };
};

export const clearRequestConnectVideoConference = () => {
  return async (dispatch: any) => {
    await dispatch(videoConferenceActions.clearRequestConnectVideoConference());
  };
};

export const clearVideoConference = () => {
  return async (dispatch: any) => {
    await dispatch(videoConferenceActions.clear());
  };
};
