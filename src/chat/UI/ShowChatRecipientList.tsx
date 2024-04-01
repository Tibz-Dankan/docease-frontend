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
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";
import { HiOutlineChevronDoubleUp } from "react-icons/hi2";
import { UserOnlineStatus } from "../../onlineStatus/UI/UserOnlineStatus";

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
  // const hideChatHandler = () => {
  //   dispatch(hideChat());
  // };

  const showChatOperationHandler = () => {
    if (!showChatRecipientListValue) {
      showChatRecipientListHandler();
    } else {
      // hideRecipientListHandler(), hideChatHandler();
      hideRecipientListHandler();
    }
  };

  return (
    <Fragment>
      <div
        className="flex items-center justify-between gap-3 
         w-autos w-full py-2 px-4 rounded-t-md 
         right-[5vh] shadow-2xls z-[500] cursor-pointer
         border-gray-400 border-[1px] bg-gray-50
         shadow-md"
        onClick={() => showChatOperationHandler()}
      >
        <div className="flex items-center justify-center gap-3">
          <div
            className="bg-gray-light-3 flex items-center justify-center 
            w-10 h-10 rounded-[50%] relative"
          >
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt={user.firstName}
                className="w-full h-full rounded-[50%]"
              />
            )}
            {!user.imageUrl && (
              <span
                className="cursor-pointer grid place-items-center bg-gray-300
                 w-full h-full rounded-[50%]"
              >
                <IconContext.Provider
                  value={{ size: "1.2rem", color: "#495057" }}
                >
                  <IoPerson />
                </IconContext.Provider>
              </span>
            )}
            <div className="absolute -right-[6px] bottom-1 inline-block">
              <UserOnlineStatus
                userId={user.userId}
                updatedAt={user.onlineStatus?.updatedAt!}
              />
            </div>
          </div>
          <span className="font-semibold text-gray-800">Messaging</span>
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
                <HiOutlineChevronDoubleDown />
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
                <HiOutlineChevronDoubleUp />
              </IconContext.Provider>
            </span>
          )}
        </div>
      </div>
    </Fragment>
  );
};
