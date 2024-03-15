import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import {
  hideChat,
  showChatRecipientList,
  updateStartChatRecipient,
} from "../../store/actions/chat";
import { IconContext } from "react-icons";
import { BsChatSquareTextFill } from "react-icons/bs";
// import { BsChatSquareText } from "react-icons/bs";
import { TChatRecipient } from "../../types/chat";

interface StartChatProps {
  className?: string;
  startChatRecipient: TChatRecipient;
}

export const StartChat: React.FC<StartChatProps> = (props) => {
  const recipient: TChatRecipient = props.startChatRecipient;

  const dispatch: any = useDispatch();

  const showChatRecipientListHandler = () => {
    dispatch(showChatRecipientList());

    if (window.innerWidth < 640) {
      dispatch(hideChat());
    }
  };

  const updateStartRecipientHandler = () => {
    dispatch(updateStartChatRecipient(recipient));
    showChatRecipientListHandler();
  };

  return (
    <Fragment>
      <div className={twMerge(`inline-block`, props.className)}>
        <span
          className="w-10 h-10 rounded-[50%] flex items-center 
           justify-center bg-white border-[1px] border-gray-300
           shadow-lg cursor-pointer"
          onClick={() => updateStartRecipientHandler()}
        >
          <IconContext.Provider value={{ size: "1.0rem", color: "#1c7ed6" }}>
            <BsChatSquareTextFill />
          </IconContext.Provider>
        </span>
      </div>
    </Fragment>
  );
};
