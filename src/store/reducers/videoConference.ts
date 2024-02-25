import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TVideoConference,
  TVideoConferenceConnected,
} from "../../types/videoConference";

const initialState: TVideoConferenceConnected = {
  videoConferenceId: "",
  hostId: "",
  attendeeId: "",
  createdAt: "",
  updatedAt: "",
  Host: null,
  Attendee: null,
  hasConnected: false,
  connectPeerId: "",
  requestConnectVideoConferenceId: "",
  requestConnectMessage: "",
};

export const videoConferenceSlice = createSlice({
  name: "videoConference",
  initialState,
  reducers: {
    update(state, action: PayloadAction<TVideoConference>) {
      state.videoConferenceId = action.payload.videoConferenceId;
      state.hostId = action.payload.hostId;
      state.attendeeId = action.payload.attendeeId;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.Host = action.payload.Host;
      state.Attendee = action.payload.Attendee;
    },
    updateConnected(state, action: PayloadAction<{ connectPeerId: string }>) {
      state.hasConnected = true;
      state.connectPeerId = action.payload.connectPeerId;
    },
    updateRequestConnectVideoConference(
      state,
      action: PayloadAction<{
        requestConnectVideoConferenceId: string;
        requestConnectMessage: string;
      }>
    ) {
      state.requestConnectVideoConferenceId =
        action.payload.requestConnectVideoConferenceId;
      state.requestConnectMessage = action.payload.requestConnectMessage;
    },
    clearRequestConnectVideoConference(state) {
      state.requestConnectVideoConferenceId = "";
    },
    clear(state) {
      (state.videoConferenceId = ""),
        (state.hostId = ""),
        (state.attendeeId = ""),
        (state.createdAt = ""),
        (state.updatedAt = ""),
        (state.Host = null),
        (state.Attendee = null),
        (state.hasConnected = false),
        (state.connectPeerId = ""),
        (state.requestConnectVideoConferenceId = ""),
        (state.requestConnectMessage = "");
    },
  },
});
