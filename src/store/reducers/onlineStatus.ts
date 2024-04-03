import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOnlineStatus, TOnlineUserPayload } from "../../types/onlineStatus";

const initialState: TOnlineStatus = {
  users: {},
};

export const onlineStatusSlice = createSlice({
  name: "onlineStatus",
  initialState,
  reducers: {
    updateStatus(state, action: PayloadAction<TOnlineUserPayload>) {
      state.users[`${action.payload.userId}`] = action.payload.updatedAt;
    },
    clearStatus(state, action) {
      delete state.users[`${action.payload.userId}`];
    },
    clearAll(state) {
      state.users = {};
    },
  },
});
