import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuth, TAuthExtended } from "../../types/auth";

const initialState: TAuthExtended = {
  accessToken: null,
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<TAuth>) {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = !!state.accessToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
