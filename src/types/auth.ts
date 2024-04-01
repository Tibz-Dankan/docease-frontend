export type TUser = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "patient" | "doctor" | "admin";
  gender?: "string";
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  twoFA?: TTwoFA;
  onlineStatus?: TOnlineStatus;
};

export type TAuth = {
  status?: string;
  accessToken: string | null;
  expiresIn?: number;
  expirationTime?: string;
  user: TUser | null;
};

export type TAuthExtended = {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: TUser | null;
};

export type TAuthState = {
  auth: TAuthExtended;
};

export type TSigninInPut = {
  email: string;
  password: string;
};

export type TSignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  password: string;
};

export type TAuthToken = {
  exp: number;
  iat: number;
  userId: number;
};

export type TCreateTwoFA = {
  userId: string;
  platform: string;
  browser: string;
  browserVersion: string;
};

export type TCreateTwoFAExtended = TCreateTwoFA & {
  accessToken: string;
};

export type TAuthDevices = {
  sessionDeviceId: string;
  userId: string;
  platform: string;
  browser: string;
  browserVersion: string;
  createdAt: string;
  updatedAt: string;
};

export type TTwoFA = {
  twofaId: string;
  userId: string;
  isEnabled: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TOnlineStatus = {
  updatedAt: string;
};
