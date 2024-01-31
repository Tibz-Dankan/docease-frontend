import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";
import { sidebarSlice } from "./reducers/sidebar";
import { modalSlice } from "./reducers/modal";
import { reloadSlice } from "./reducers/reload";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    sidebar: sidebarSlice.reducer,
    modal: modalSlice.reducer,
    reload: reloadSlice.reducer,
  },
});

let url: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
} else {
  url = "https://docease-backend-v2.onrender.com/api/v1";
}

export { url };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const sidebarActions = sidebarSlice.actions;
export const modalActions = modalSlice.actions;
export const reloadActions = reloadSlice.actions;
