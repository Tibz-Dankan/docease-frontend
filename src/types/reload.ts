export type TReload = {
  entity:
    | "appointments"
    | "schedules"
    | "medicalFiles"
    | "mentalHealth"
    | "signupTokens"
    | "notifications"
    | "";
  isReloading: boolean;
};

export type TReloadState = {
  // entity: string;
  // isReloading: boolean;
  reload: TReload;
};
