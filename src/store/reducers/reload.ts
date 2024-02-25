import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TReload } from "../../types/reload";

const initialState: TReload = {
  entity: "",
  isReloading: false,
};

export const reloadSlice = createSlice({
  name: "reload",
  initialState,
  reducers: {
    updateReload(state, action: PayloadAction<TReload>) {
      state.entity = action.payload.entity;
      state.isReloading = action.payload.isReloading;
    },
    clearReload(state) {
      (state.entity = ""), (state.isReloading = false);
    },
  },
});
