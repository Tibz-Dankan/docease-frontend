import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TNotification,
  TNotificationPayload,
  TServerNotification,
} from "../../types/notification";

const initialState: TNotification = {
  showCardNotification: false,
  cardNotificationType: null,
  cardMessage: null,
  cardNotificationTitle: null,
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showCardNotification(state, action: PayloadAction<TNotificationPayload>) {
      state.showCardNotification = true;
      state.cardNotificationType = action.payload.type;
      state.cardMessage = action.payload.message;
    },
    hideCardNotification(state) {
      state.showCardNotification = false;
      state.cardNotificationType = null;
      state.cardMessage = null;
    },

    updateServerNotifications(
      state,
      action: PayloadAction<{ notifications: TServerNotification[] }>
    ) {
      state.notifications = action.payload.notifications;
    },

    updateOneServerNotification(
      state,
      action: PayloadAction<{ notification: TServerNotification }>
    ) {
      const notificationId = action.payload.notification.notificationId;
      if (notificationId) return;
      const notifications = state.notifications;

      let notificationIndex = notifications.findIndex(
        (notification) => notification.notificationId === notificationId
      );

      notifications[notificationIndex] = action.payload.notification;

      state.notifications = notifications;
    },

    AddServerNotificationToList(
      state,
      action: PayloadAction<{ notification: TServerNotification }>
    ) {
      const notificationId = action.payload.notification.notificationId;
      if (notificationId) return;
      const notifications = state.notifications;

      const notification = notifications.find(
        (notification) => notification.notificationId === notificationId
      );
      if (notification) return;

      notifications.unshift(action.payload.notification);
      state.notifications = notifications;
    },

    clearNotification(state) {
      state.showCardNotification = false;
      state.cardNotificationType = null;
      state.cardMessage = null;
      state.notifications = [];
    },
  },
});

export const { showCardNotification, hideCardNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
