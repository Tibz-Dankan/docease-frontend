import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";
import { sidebarSlice } from "./reducers/sidebar";
import { modalSlice } from "./reducers/modal";
import { reloadSlice } from "./reducers/reload";
import { liveNotificationSlice } from "./reducers/liveNotification";
import { videoConferenceSlice } from "./reducers/videoConference";
import { chatSlice } from "./reducers/chat";
import { teamSlice } from "./reducers/team";
import { onlineStatusSlice } from "./reducers/onlineStatus";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    liveNotification: liveNotificationSlice.reducer,
    videoConference: videoConferenceSlice.reducer,
    chat: chatSlice.reducer,
    sidebar: sidebarSlice.reducer,
    modal: modalSlice.reducer,
    reload: reloadSlice.reducer,
    team: teamSlice.reducer,
    onlineStatus: onlineStatusSlice.reducer,
  },
});

let url: string;
let socketUrl: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
  socketUrl = "http://localhost:8000";
} else {
  url = "https://docease-backendv2.onrender.com/api/v1";
  socketUrl = "https://docease-backendv2.onrender.com";
}

export { url, socketUrl };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const liveNotificationActions = liveNotificationSlice.actions;
export const chatActions = chatSlice.actions;
export const videoConferenceActions = videoConferenceSlice.actions;
export const sidebarActions = sidebarSlice.actions;
export const modalActions = modalSlice.actions;
export const reloadActions = reloadSlice.actions;
export const teamActions = teamSlice.actions;
export const onlineStatusActions = onlineStatusSlice.actions;
