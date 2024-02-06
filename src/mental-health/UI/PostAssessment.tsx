import React, { Fragment } from "react";
import questions from "../data/mentalHealthQuestions.json";
import Checkbox from "rc-checkbox";

export const PostAssessment: React.FC = () => {
  console.log("questions->", questions);
  return (
    <Fragment>
      <div>
        <div
          className="flex flex-col items-start justify-center gap-8
          text-gray-800"
        >
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              <div>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-start w-full gap-4"
                  >
                    <Checkbox />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
