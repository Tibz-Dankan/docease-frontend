import React, { Fragment, useEffect } from "react";
import { ChatRecipientList } from "../UI/ChatRecipientList";
import { useSelector, useDispatch } from "react-redux";
import { ChatAggregator } from "./ChatAggregator";
import { hideChatRecipientList } from "../../store/actions/chat";

export const ChatLayout: React.FC = () => {
  const showChatValue: boolean = useSelector(
    (state: any) => state.chat.showChat
  );
  const showChatRecipientListValue = useSelector(
    (state: any) => state.chat.showChatRecipientList
  );
  const appWidth: number = window.innerWidth;

  const dispatch: any = useDispatch();

  useEffect(() => {
    const setChatView = () => {
      if (appWidth < 640 && showChatValue) {
        dispatch(hideChatRecipientList());
      }
    };
    setChatView();
  }, [dispatch, appWidth]);

  return (
    <Fragment>
      <div
        className="w-[100%] sm:w-[600px]s h-auto
         fixed top-0 sm:top-auto bottom-[0vh] sm:bottom-[5vh]s z-[600] sm:right-[5%]
         lg:right-[15%] flex items-end justify-center gap-x-2
         transition-all"
      >
        {showChatRecipientListValue && <ChatRecipientList />}
        {showChatValue && <ChatAggregator />}
      </div>
    </Fragment>
  );
};
