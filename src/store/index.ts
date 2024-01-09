import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

let url: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
} else {
  url = "production-url/api/v1";
}

export { url };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
