import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOnlineStatus, TOnlineUserPayload } from "../../types/onlineStatus";

// Map of key <userId> and value <updatedAt> of iso string
// const users = new Map<string, string>();
const initialState: TOnlineStatus = {
  //   users: users,
  users: {},
};

export const onlineStatusSlice = createSlice({
  name: "onlineStatus",
  initialState,
  reducers: {
    updateStatus(state, action: PayloadAction<TOnlineUserPayload>) {
      //   state.users.set(action.payload.userId, action.payload.updatedAt);
      state.users[`${action.payload.userId}`] = action.payload.updatedAt;
    },
    clearStatus(state, action) {
      //   state.users.delete(action.payload.userId);
      delete state.users[`${action.payload.userId}`];
    },
    clearAll(state) {
      state.users = {};
    },
  },
});
