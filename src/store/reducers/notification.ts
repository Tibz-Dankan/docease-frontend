import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNotification, TNotificationPayload } from "../../types/notification";

const initialState: TNotification = {
  showCardNotification: false,
  cardNotificationType: null,
  cardMessage: null,
  cardNotificationTitle: null,
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
  },
});

export const { showCardNotification, hideCardNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
