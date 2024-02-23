export type TAnsweredQuestion = {
  question: string;
  option: string;
};

export type TMentalHealthAssessment = {
  mentalHealthId: string;
  userId: string;
  answeredQuestions: TAnsweredQuestion[];
  aiResponse: string;
  createdAt: string;
  updatedAt: string;
};
