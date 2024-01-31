import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isScheduleReload: boolean;
  isAppointmentReload: boolean;
};

const initialState: InitialState = {
  isScheduleReload: false,
  isAppointmentReload: false,
};

export const reloadSlice = createSlice({
  name: "reload",
  initialState,
  reducers: {
    startScheduleReload(state) {
      state.isScheduleReload = true;
    },
    stopScheduleReload(state) {
      state.isScheduleReload = false;
    },
  },
});

export default reloadSlice.reducer;
