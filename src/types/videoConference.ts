import { TUser } from "./auth";

export type TVideoConference = {
  videoConferenceId: string;
  hostId: string;
  attendeeId: string;
  createdAt: string;
  updatedAt: string;
  Host: TUser | null;
  Attendee: TUser | null;
};

export type TVideoConferenceState = {
  videoConference: TVideoConference;
};

export type TVideoConferenceExtended = TVideoConference & {
  userPeerId: string;
  userId: string;
};

export type TVideoConferenceConnected = TVideoConference & {
  hasConnected: boolean;
  connectPeerId: string;
  requestConnectVideoConferenceId: string;
  requestConnectMessage: string;
};

export type TVideoConferenceConnectedState = {
  videoConference: TVideoConferenceConnected;
};
