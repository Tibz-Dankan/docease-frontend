import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  currentMember: {},
};
export const teamSlice = createSlice({
  name: "team",
  initialState: theInitialState,
  reducers: {
    updateTeamMember(state, action) {
      state.currentMember = action.payload.currentMember;
      return;
    },
    clear(state) {
      state.currentMember = {};
    },
  },
});
