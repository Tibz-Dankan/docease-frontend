import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideChat,
  hideChatRecipientList,
  showChatRecipientList,
} from "../../store/actions/chat";
import { TAuthState } from "../../types/auth";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

export const ShowChatRecipientList: React.FC = () => {
  const showChatRecipientListValue = useSelector(
    (state: any) => state.chat.showChatRecipientList
  );
  const user = useSelector((state: TAuthState) => state.auth.user!);
  const dispatch: any = useDispatch();

  const showChatRecipientListHandler = () => {
    dispatch(showChatRecipientList());

    if (window.innerWidth < 640) {
      dispatch(hideChat());
    }
  };
  const hideRecipientListHandler = () => {
    dispatch(hideChatRecipientList());
  };
  const hideChatHandler = () => {
    dispatch(hideChat());
  };

  const showChatOperationHandler = () => {
    if (!showChatRecipientListValue) {
      showChatRecipientListHandler();
    } else {
      hideRecipientListHandler(), hideChatHandler();
    }
  };

  return (
    <Fragment>
      <div
        className="flex items-center justify-center gap-3 
         w-auto bg-whites py-2 px-4 rounded-t-md  fixed 
         bottom-[1vh] right-[5vh] shadow-2xl z-[500] cursor-pointer
         border-gray-300 border-2 bg-white "
        onClick={() => showChatOperationHandler()}
      >
        {user.imageUrl && (
          <div
            className="bg-gray-light-3 flex items-center justify-center 
             w-10 h-10 rounded-[50%]"
          >
            <img
              src={user.imageUrl}
              alt={user.firstName}
              className="w-full  h-full rounded-[50%]"
            />
          </div>
        )}
        {!user.imageUrl && (
          <span
            className="cursor-pointer grid place-items-center bg-gray-300
             w-10 h-10 rounded-[50%]"
          >
            <IconContext.Provider value={{ size: "1.2rem", color: "#495057" }}>
              <IoPerson />
            </IconContext.Provider>
          </span>
        )}
        <div className="flex items-center justify-center gap-2 text-gray-800">
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </div>
        <div>
          {showChatRecipientListValue && (
            <span
              className="cursor-pointer flex items-center 
              text-gray-400 text-sm"
            >
              <IconContext.Provider
                value={{ size: "1.2rem", color: "#495057" }}
              >
                <GoChevronDown />
              </IconContext.Provider>
            </span>
          )}
          {!showChatRecipientListValue && (
            <span
              className="cursor-pointer flex items-center 
              text-gray-400 text-sm"
            >
              <IconContext.Provider
                value={{ size: "1.2rem", color: "#495057" }}
              >
                <GoChevronUp />
              </IconContext.Provider>
            </span>
          )}
        </div>
      </div>
    </Fragment>
  );
};
