import React, { Fragment, useState } from "react";
import questions from "../data/mentalHealthQuestions.json";
import { RadioGroup, Radio } from "react-radio-group";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { postAssessment } from "../API";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";
import { TAuthState } from "../../types/auth";
import { TAnsweredQuestion } from "../../types/mentalHealth";
import { AIResponse } from "./AIResponse";

export const PostAssessment: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<TAnsweredQuestion[]>([]);
  const [, setValue] = useState("");

  const onChangeHandler = (value: string) => setValue(() => value);

  const onClickHandler = (question: string, option: string) => {
    const alreadySelectedQtn = selectedValues.find(
      (selectedQuestion) => selectedQuestion.question === question
    );

    if (!alreadySelectedQtn) {
      selectedValues.push({ question: question, option: option });
      return;
    }

    const isSimilarOption: boolean = alreadySelectedQtn.option === option;

    if (isSimilarOption) {
      const newSelectedValues = selectedValues.filter(
        (selectedQuestion) => selectedQuestion.question !== question
      );

      setSelectedValues(() => newSelectedValues);
      return;
    }

    alreadySelectedQtn.option = option;
    selectedValues.map((selectedQuestion) => {
      if (alreadySelectedQtn.question !== selectedQuestion.question) return;
      selectedQuestion = alreadySelectedQtn;
    });
  };

  const getSelectedValue = (question: string): string => {
    const selectedQtn = selectedValues.find(
      (selectedQuestion) => selectedQuestion.question === question
    );

    if (!selectedQtn) return "";
    return selectedQtn.option;
  };

  const auth = useSelector((state: TAuthState) => state.auth);

  const dispatch: any = useDispatch();

  const { isLoading, data, mutate } = useMutation({
    mutationFn: postAssessment,
    onSuccess: (response: any) => {
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const postAssessmentHandler = () => {
    const userId = auth.user?.userId as string;
    const accessToken = auth.accessToken as string;
    if (!userId) return;

    const isValidQtnLength = selectedValues.length >= 5;
    if (!isValidQtnLength) {
      dispatch(
        showCardNotification({
          type: "error",
          message: "Please answer at least 5 questions!",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    }
    mutate({
      userId: userId,
      answeredQuestions: JSON.stringify(selectedValues),
      token: accessToken,
    });
  };

  const assessmentSummary = data?.data?.mentalHealth?.aiResponse;

  return (
    <Fragment>
      <div className="py-8">
        <div className="border-b-[1px] border-gray-300 mb-4 pb-2">
          <p className="text-gray-600 font-semibold text-xl">
            Take mental assessment
          </p>
        </div>
        <div
          className="flex flex-col items-start justify-center gap-8
          text-gray-700"
        >
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              <RadioGroup
                name={question.question}
                selectedValue={getSelectedValue(question.question)}
                onChange={onChangeHandler}
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-start w-full gap-4"
                    onClick={() => onClickHandler(question.question, option)}
                  >
                    <Radio value={option} />
                    {option}
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
        {assessmentSummary && (
          <div className="mt-8 border-t-[1px] border-gray-300 w-full pt-2">
            <p className="pl-2 text-gray-800 mb-2 text-lg">Summary</p>
            <AIResponse message={assessmentSummary} />
          </div>
        )}
        <div
          className="flex items-center justify-start
           border-t-[1px] border-gray-300 mt-4 pt-4"
        >
          <div className="w-48">
            {!isLoading && (
              <Button
                label="Submit"
                type="button"
                onClick={() => postAssessmentHandler()}
                className="py-2"
              />
            )}
            {isLoading && (
              <div className="flex items-center justify-center w-48 bg-primary rounded py-1">
                <Loader className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
