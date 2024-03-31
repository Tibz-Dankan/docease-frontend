export type TOnlineUserPayload = {
  userId: string;
  updatedAt: string;
};

// export type TOnlineStatus = {
//   users: Map<string, string>;
// };

export type TOnlineStatus = {
  users: any;
};

export type TOnlineStatusState = {
  onlineStatus: TOnlineStatus;
};
