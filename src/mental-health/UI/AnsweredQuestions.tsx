import React, { Fragment } from "react";
import { TAnsweredQuestion } from "../../types/mentalHealth";

interface AnsweredQuestionsProps {
  answeredQuestions: TAnsweredQuestion[];
}

export const AnsweredQuestions: React.FC<AnsweredQuestionsProps> = (props) => {
  const answeredQuestions = props.answeredQuestions;
  return (
    <Fragment>
      <div
        className="w-full h-[30vh] overflow-x-hidden p-2 sm:p-4 rounded-2xl
        flex flex-col items-start justify-center gap-4"
      >
        {answeredQuestions.map((answeredQuestion, index) => (
          <div key={index}>
            <p className="w-full flex items-start gap-2 sm:gap-4">
              <span className="text-gray-500">Question:</span>
              <span className="text-gray-800 text-sm">
                {answeredQuestion.question}
              </span>
            </p>
            <p className="w-full flex items-start gap-4 sm:gap-8">
              <span className="text-gray-500">Option:</span>
              <span className="text-gray-800 text-sm font-semibold">
                {answeredQuestion.option}
              </span>
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
