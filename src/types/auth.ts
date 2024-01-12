export type TUser = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "patient" | "doctor" | "admin";
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TAuth = {
  status: string;
  accessToken: string;
  expiresIn: number;
  expirationTime: string;
  user: TUser;
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
