import React, { Fragment, useEffect } from "react";
import { ChatRecipientList } from "../UI/ChatRecipientList";
import { useSelector, useDispatch } from "react-redux";
import { ChatAggregator } from "./ChatAggregator";
import { hideChatRecipientList } from "../../store/actions/chat";
import { ShowChatRecipientList } from "../UI/ShowChatRecipientList";

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
        className="w-[100%] sm:w-auto h-auto
         fixed top-0 sm:top-auto bottom-[0vh] z-[600] 
         sm:right-0 flex items-end justify-end gap-x-4 
         sm:pr-4 transition-all"
      >
        {showChatValue && <ChatAggregator />}
        <div className="w-full sm:w-72 shadow">
          <ShowChatRecipientList />
          {showChatRecipientListValue && <ChatRecipientList />}
        </div>
      </div>
    </Fragment>
  );
};
