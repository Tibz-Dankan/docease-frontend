import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// import { MessageBadge } from "./MessageBadge";
// import { Socket } from "socket.io-client";
import { TAuthState } from "../../types/auth";
import {
  clearMessageList,
  hideChatRecipientList,
  showChat,
  updateCurrentRecipient,
} from "../../store/actions/chat";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";

import { getChatRecipients } from "../API";
import { IconContext } from "react-icons";
import { IoClose, IoPerson } from "react-icons/io5";
import { TChatRecipient, TChatState } from "../../types/chat";

export const ChatRecipientList: React.FC = () => {
  const currentUserId: string = useSelector(
    (state: TAuthState) => state.auth.user?.userId!
  );

  const recipient = useSelector(
    (state: TChatState) => state.chat.currentRecipient
  );
  const accessToken: string = useSelector(
    (state: TAuthState) => state.auth.accessToken!
  );

  const dispatch: any = useDispatch();
  const [recipientList, setRecipientList] = useState<TChatRecipient[]>([]);
  const [activeRecipient, setActiveRecipient] =
    useState<TChatRecipient>(recipient);

  const showChatHandler = () => {
    dispatch(showChat());
  };

  const clearMessageListHandler = () => {
    dispatch(clearMessageList());
  };

  const { isLoading, data } = useQuery(
    ["chatRecipientList"],
    () => {
      return getChatRecipients({
        userId: currentUserId,
        accessToken: accessToken,
      });
    },
    {
      onSuccess: (response: any) => {
        console.log("chat recipient response: ", response);
        setRecipientList(() => response.data.recipients);
      },
      onError: (error: any) => {
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      },
    }
  );

  // TODO: show custom loader here
  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data fetched(Recipient)</p>;

  const joinChatRoom = async (recipient: TChatRecipient) => {
    dispatch(updateCurrentRecipient(recipient));
    setActiveRecipient(recipient);
  };

  const hideRecipientListHandler = () => {
    dispatch(hideChatRecipientList());
  };

  const onJoinChatRoomHandler = (recipient: TChatRecipient) => {
    joinChatRoom(recipient), clearMessageListHandler(), showChatHandler();

    if (window.innerWidth < 640) {
      hideRecipientListHandler();
    }
  };

  return (
    <Fragment>
      <div
        className="w-full sm:w-60 border-[1px] border-gray-ligh
            sm:rounded-md rounded-tl-lgs shadow-2xl animate-opacityZeroToFull"
      >
        <div
          className="flex items-center justify-between border-b-[1px] 
            border-primary p-4 bg-primary rounded-tl-md rounded-tr-md"
        >
          <span className="text-gray-50">Messaging</span>
          <svg
            className="w-6 h-6 fill-gray-100 cursor-pointer"
            onClick={() => hideRecipientListHandler()}
          >
            <IconContext.Provider
              value={{
                size: "1.4rem",
                color: "#343a40",
              }}
            >
              <IoClose />
            </IconContext.Provider>
          </svg>
        </div>
        <div>
          {recipientList.map((recipient: TChatRecipient, index: number) => {
            return (
              <div
                className={`relative p-4 flex items-center justify-start border-b-[1px]
                    border-gray-light-3 cursor-pointer  ${
                      recipient.userId == activeRecipient?.userId
                        ? "bg-gray-200"
                        : "bg-gray-50"
                    }
                
                `}
                key={index + 1}
                onClick={() => onJoinChatRoomHandler(recipient)}
              >
                {recipient.imageUrl && (
                  <div
                    className="bg-gray-light-3 flex items-center justify-center 
                        w-10 h-10 rounded-[50%]"
                  >
                    <img
                      src={recipient.imageUrl}
                      alt={recipient.firstName}
                      className="w-full  h-full rounded-[50%]"
                    />
                  </div>
                )}
                {!recipient.imageUrl && (
                  <span
                    className="cursor-pointer grid place-items-center  bg-gray-300
                  w-10 h-10 rounded-[50%]"
                  >
                    <IconContext.Provider
                      value={{ size: "1.2rem", color: "#495057" }}
                    >
                      <IoPerson />
                    </IconContext.Provider>
                  </span>
                )}
                <div className="px-2 text-sm text-gray-800">
                  <p className="font-bold">
                    {recipient.firstName} {recipient.lastName}
                  </p>
                  {/* <p className="text-gray-500">{"recipient.lastChatMessage"}</p> */}
                  {/* <p className="text-gray-500">{"Last message"}</p> */}
                </div>
                <span className="absolute top-4 right-4 text-[12px]">
                  {/* {"recipient.chatMessageDate"} */}
                  {/* {"Last date"} */}
                </span>
                {/* {recipient.userId === sellerRecipient.userId && (
                  <div className="absolute bottom-0 right-0">
                    <MessageBadge />
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
