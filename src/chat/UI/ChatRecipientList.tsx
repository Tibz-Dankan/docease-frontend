import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { TAuthState } from "../../types/auth";
import {
  hideChatRecipientList,
  showChat,
  updateChatRecipientList,
  updateCurrentRecipient,
  updateMessagesAsRead,
} from "../../store/actions/chat";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";

import { getChatRecipients, markMessagesAsRead } from "../API";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { IChatMessage, TChatRecipient, TChatState } from "../../types/chat";
import { AppDate } from "../../utils/appDate";
import { truncateString } from "../../utils/truncateString";
import { MessageBadge } from "./MessageBadge";
import { Image } from "../../shared/UI/Image";
import { ChatRecipientListLoader } from "./ChatRecipientListLoader";

export const ChatRecipientList: React.FC = () => {
  const currentUserId: string = useSelector(
    (state: TAuthState) => state.auth.user?.userId!
  );

  const recipient = useSelector(
    (state: TChatState) => state.chat.currentRecipient
  );
  const chatRecipientList = useSelector(
    (state: TChatState) => state.chat.chatRecipientList
  );
  const accessToken: string = useSelector(
    (state: TAuthState) => state.auth.accessToken!
  );

  const dispatch: any = useDispatch();
  const [recipientList, setRecipientList] = useState<TChatRecipient[]>([]);
  const [activeRecipient, setActiveRecipient] =
    useState<TChatRecipient>(recipient);

  const startChatRecipient: TChatRecipient = useSelector(
    (state: TChatState) => state.chat.startChatRecipient
  );

  const showChatHandler = () => {
    dispatch(showChat());
  };

  const { isLoading } = useQuery(
    [`chatRecipientList-${currentUserId}`],
    () => {
      return getChatRecipients({
        userId: currentUserId,
        accessToken: accessToken,
      });
    },
    {
      onSuccess: (response: any) => {
        if (!response.data?.recipients[0]?.userId) return;
        setRecipientList(() => response.data.recipients);
        dispatch(updateChatRecipientList(response.data.recipients));
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

  const markMessagesAsReadHandler = async (recipient: TChatRecipient) => {
    const unReadMessage = recipient.messages.find((message) => {
      return message.isRead === false && message.recipientId === currentUserId;
    });
    if (!unReadMessage) return;

    const lastMessageCreatedAt =
      recipient.messages[recipient.messages.length - 1].createdAt;

    if (!lastMessageCreatedAt || !currentUserId) return;

    await markMessagesAsRead({
      userId: currentUserId,
      createdAt: lastMessageCreatedAt,
      accessToken: accessToken,
    });
    dispatch(updateMessagesAsRead(currentUserId, recipient.userId));
  };

  const scrollToBottom = (recipient: TChatRecipient) => {
    // Delay scrolling to bottom to allow element attain  its full height
    setTimeout(() => {
      const viewElement = document.querySelector("#message-container")!;
      viewElement?.scrollIntoView({ behavior: "smooth" });
      viewElement.scrollTop = viewElement?.scrollHeight;

      // Check if scrolled to the bottom
      const isScrolledToBottom =
        viewElement.scrollTop >=
        viewElement.scrollHeight - viewElement.clientHeight;

      if (!isScrolledToBottom) return;
      markMessagesAsReadHandler(recipient);
    }, 50);
  };

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
    scrollToBottom(recipient);
  };

  const getLastMessageDate = (messages: IChatMessage[]) => {
    const lastMessage = messages[messages.length - 1];
    return new AppDate(lastMessage?.createdAt).timeOrDate();
  };
  const getLastMessage = (recipient: TChatRecipient) => {
    const messages = recipient.messages;
    const lastMessage = messages[messages.length - 1];
    const lastMsg = lastMessage?.message ? lastMessage?.message : "";

    const msgSenderName: string =
      lastMessage?.senderId === currentUserId ? "You" : recipient.firstName;

    if (!lastMsg) return "";
    const msg = `${msgSenderName}: ${lastMsg}`;

    return truncateString(msg, 44);
  };

  const getUnReadMessageCount = (messages: IChatMessage[]): number => {
    const readMessages: IChatMessage[] = messages.filter((message) => {
      return message.isRead === false && message.recipientId === currentUserId;
    });

    return readMessages.length;
  };

  const startChatRecipientFromList = recipientList.find((recipient) => {
    return recipient.userId === startChatRecipient.userId;
  });

  const filteredRecipientList: TChatRecipient[] = recipientList.filter(
    (recipient) => {
      return recipient.userId !== startChatRecipient.userId;
    }
  );

  if (startChatRecipientFromList != undefined) {
    filteredRecipientList.unshift(startChatRecipientFromList);
  } else {
    startChatRecipient.userId && filteredRecipientList.push(startChatRecipient);
  }

  const startChatRecipientStyles = `border-[1px] border-primary`;

  useEffect(() => {
    const updateChatRecipientHandler = () => {
      setRecipientList(() => chatRecipientList);
    };
    updateChatRecipientHandler();
  }, [chatRecipientList]);

  // TODO: To improve the appearance of the recipient display
  // TODO: To add a custom loader for chat recipient

  if (isLoading) return <ChatRecipientListLoader />;

  return (
    <Fragment>
      <div
        className="w-full sm:w-72 h-[58vh] sm:h-[50vh] overflow-x-hidden
         border-[1px] border-gray-400 border-t-[0px]
         shadow-md animate-opacityZeroToFull bg-gray-50"
      >
        <div>
          {!filteredRecipientList[0] && (
            <div
              className="flex items-center justify-center
              bg-gray-50 w-full h-40 text-gray-800"
            >
              <p>Chat History will appear here</p>
            </div>
          )}
        </div>
        <div className="transition-all">
          {filteredRecipientList.map(
            (recipient: TChatRecipient, index: number) => {
              return (
                <div
                  className={`relative p-2 flex items-center justify-start
                  border-b-[1px] border-gray-light-3 cursor-pointer gap-2 ${
                    recipient.userId == activeRecipient?.userId
                      ? "bg-gray-200"
                      : "bg-gray-50"
                  } ${
                    recipient.userId === startChatRecipient.userId &&
                    startChatRecipientStyles
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
                      <Image
                        src={recipient.imageUrl}
                        alt={recipient.firstName}
                        className="w-full h-full rounded-[50%] bg-gray-400"
                      />
                    </div>
                  )}
                  {!recipient.imageUrl && (
                    <span
                      className="cursor-pointer grid place-items-center  bg-gray-400
                      w-14 h-14 rounded-[50%]"
                    >
                      <IconContext.Provider
                        value={{ size: "1.4rem", color: "#495057" }}
                      >
                        <IoPerson />
                      </IconContext.Provider>
                    </span>
                  )}
                  <div
                    className="flex-1 flex flex-col items-between justify-center
                    gap-[2px] text-sm text-gray-800"
                  >
                    <div>
                      <p className="font-semibold">
                        {truncateString(
                          `${recipient.firstName} ${recipient.lastName}`,
                          17
                        )}
                      </p>
                      <span
                        className="text-gray-600 absolute top-2 right-2 text-sm
                         tracking-tight"
                      >
                        {getLastMessageDate(recipient.messages)}
                      </span>
                    </div>
                    <div
                      className="text-gray-600 w-full leading-tight bg-green-500s 
                       flex items-end justify-between"
                    >
                      <div className="w-[85%] bg-pink-500s">
                        <p>{getLastMessage(recipient)}</p>
                      </div>
                      {/* Un read messages count */}
                      {!!getUnReadMessageCount(recipient.messages) && (
                        <div
                          className="grid place-items-center text-[12px]
                          font-semibold bg-primary rounded-[50%] h-5 min-w-5
                         text-white w-auto p-1"
                        >
                          <span>
                            {getUnReadMessageCount(recipient.messages)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {recipient.userId === startChatRecipient.userId && (
                    <div className="absolute bottom-0 right-0">
                      <MessageBadge />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </Fragment>
  );
};
