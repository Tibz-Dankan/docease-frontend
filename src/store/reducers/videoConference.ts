import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TVideoConference } from "../../types/videoConference";

const initialState: TVideoConference = {
  videoConferenceId: "",
  hostId: "",
  attendeeId: "",
  createdAt: "",
  updatedAt: "",
  Host: null,
  Attendee: null,
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
    clear(state) {
      state = initialState;
    },
  },
});
