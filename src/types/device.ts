export type TDevice = {
  deviceId: string;
  userId: string;
  devicePlatform: string;
  deviceToken: string;
  isDisable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TDeviceInfo = {
  platform: string;
  browser: string;
  browserVersion: string;
};
