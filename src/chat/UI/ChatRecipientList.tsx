import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// import { MessageBadge } from "./MessageBadge";
// import { Socket } from "socket.io-client";
import { TAuthState } from "../../types/auth";
import {
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
import { IChatMessage, TChatRecipient, TChatState } from "../../types/chat";
import recipients from "../data/chatRecipients.json";
import { AppDate } from "../../utils/appDate";
import { truncateString } from "../../utils/truncateString";

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

  // console.log("chatRecipients==>", chatRecipients);

  const chatRecipients = recipients as TChatRecipient[];

  const dispatch: any = useDispatch();
  const [recipientList, setRecipientList] = useState<TChatRecipient[]>([]);
  const [activeRecipient, setActiveRecipient] =
    useState<TChatRecipient>(recipient);

  const showChatHandler = () => {
    dispatch(showChat());
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
    joinChatRoom(recipient), showChatHandler();

    if (window.innerWidth < 640) {
      hideRecipientListHandler();
    }
  };

  const getLastMessageDate = (messages: IChatMessage[]) => {
    const lastMessage = messages[messages.length - 1];
    return new AppDate(lastMessage?.createdAt).timeOrDate();
  };
  const getLastMessage = (messages: IChatMessage[]) => {
    const lastMessage = messages[messages.length - 1];
    return truncateString(lastMessage?.message);
  };

  return (
    <Fragment>
      <div
        className="w-full sm:w-80 border-[1px] border-gray-300
        sm:rounded-mds sm:rounded-t-md shadow-md animate-opacityZeroToFull"
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
                color: "#fff",
              }}
            >
              <IoClose />
            </IconContext.Provider>
          </svg>
        </div>
        <div>
          {/* {recipientList.map((recipient: TChatRecipient, index: number) => { */}
          {chatRecipients.map((recipient: TChatRecipient, index: number) => {
            return (
              <div
                className={`relative p-2 flex items-center justify-start border-b-[1px]
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
                    w-14 h-14 rounded-[50%]"
                  >
                    <img
                      src={recipient.imageUrl}
                      alt={recipient.firstName}
                      className="w-full  h-full rounded-[50%] bg-gray-400"
                    />
                  </div>
                )}
                {!recipient.imageUrl && (
                  <span
                    className="cursor-pointer grid place-items-center  bg-gray-400
                    w-14 h-14 rounded-[50%]"
                  >
                    <IconContext.Provider
                      value={{ size: "1.6rem", color: "#495057" }}
                    >
                      <IoPerson />
                    </IconContext.Provider>
                  </span>
                )}
                <div
                  className="flex-1 flex flex-col items-between justify-center
                   gap-1 px-2 text-sm text-gray-800"
                >
                  <div>
                    <p className="font-bold">
                      {truncateString(
                        `${recipient.firstName} ${recipient.lastName}`,
                        16
                      )}
                    </p>
                    <span className="text-gray-600 absolute top-3 right-2 text-sm">
                      {getLastMessageDate(recipient.messages)}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    <p>{getLastMessage(recipient.messages)}</p>
                  </div>
                </div>
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
