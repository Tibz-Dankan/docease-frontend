import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { BsChatFill } from "react-icons/bs";
import { TUser } from "../../types/auth";
import {
  hideChat,
  showChatRecipientList,
  updateCurrentRecipient,
} from "../../store/actions/chat";
import { IconContext } from "react-icons";

interface StartChatProps {
  className?: string;
  currentRecipient: TUser;
}

export const StartChat: React.FC<StartChatProps> = (props) => {
  const recipient: TUser = props.currentRecipient;

  const dispatch: any = useDispatch();

  const showChatRecipientListHandler = () => {
    dispatch(showChatRecipientList());

    if (window.innerWidth < 640) {
      dispatch(hideChat());
    }
  };

  const updateCurrentRecipientHandler = () => {
    dispatch(updateCurrentRecipient(recipient));
    showChatRecipientListHandler();
  };

  return (
    <Fragment>
      <div className={twMerge(`w-full`, props.className)}>
        <span
          className="cursor-pointer flex items-center 
          text-gray-400 text-sm"
          onClick={() => updateCurrentRecipientHandler()}
        >
          <IconContext.Provider value={{ size: "1.2rem", color: "#495057" }}>
            <BsChatFill />
          </IconContext.Provider>
        </span>
      </div>
    </Fragment>
  );
};
