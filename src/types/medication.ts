export type TMedication = {
  healthStatus: string;
  medication: string;
  illness: string;
  diet: string;
};

export type TMedicationExtended = TMedication & {
  accessToken: string;
};
