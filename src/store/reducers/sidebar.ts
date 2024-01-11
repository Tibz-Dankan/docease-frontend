import { createSlice } from "@reduxjs/toolkit";
import { TSidebar } from "../../types/sidebar";

const initialState: TSidebar = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar(state) {
      state.isOpen = true;
    },
    closeSidebar(state) {
      state.isOpen = false;
    },
  },
});
