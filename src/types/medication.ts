export type TMedication = {
  healthStatus: string;
  medication: string;
  illness: string;
  diet: string;
};

export type TMedicationExtended = TMedication & {
  accessToken: string;
  userId: string;
};

export type TMedicalFile = {
  medicalFileId: string;
  userId: string;
  name: string;
  path: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};
