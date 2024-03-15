import { useMutation } from "@tanstack/react-query";
import React, { Fragment, useRef } from "react";
import { IconContext } from "react-icons";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToMessageList,
  addToRecipientMessageList,
  clearPostingMessage,
  updatePostingMessage,
} from "../../store/actions/chat";
import { postChat } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TAuthState, TUser } from "../../types/auth";
import { generateChatRoomId } from "../../utils/generateChatRoomId";

export const ChatForm: React.FC = () => {
  let messageRef = useRef<any>(null);

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken!
  );
  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

  const chatRoomId = generateChatRoomId(currentUser, recipient);

  const dispatch: any = useDispatch();

  const { mutate } = useMutation({
    mutationFn: postChat,
    onSuccess: (_: any) => {
      dispatch(clearPostingMessage());
    },
    onError: (error: any) => {
      dispatch(clearPostingMessage());
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const scrollToBottom = () => {
    // Delay scrolling to bottom to allow element attain its full height
    setTimeout(() => {
      const viewElement = document.querySelector("#message-container")!;
      viewElement.scrollIntoView({ behavior: "smooth" });
      viewElement.scrollTop = viewElement?.scrollHeight;
    }, 50);
  };

  const sendMessageHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const createdAt = new Date().toISOString();
    const message: string = messageRef.current && messageRef.current?.value;

    if (!message) return;

    mutate({
      senderId: currentUser.userId,
      recipientId: recipient.userId,
      chatRoomId: chatRoomId,
      message: message,
      isRead: false,
      isDelivered: false,
      createdAt: createdAt,
      accessToken: accessToken,
    });

    // Dispatch message to the store
    dispatch(
      addToMessageList({
        senderId: currentUser.userId,
        recipientId: recipient.userId,
        chatRoomId: chatRoomId,
        message: message,
        isRead: false,
        isDelivered: false,
        createdAt: createdAt,
      })
    );
    dispatch(
      updatePostingMessage({
        chatRoomId: chatRoomId,
        senderId: currentUser.userId,
        recipientId: recipient.userId,
        message: message,
        isRead: false,
        isDelivered: false,
        createdAt: createdAt,
        isPosting: true,
      })
    );

    dispatch(
      addToRecipientMessageList({
        senderId: currentUser.userId,
        recipientId: recipient.userId,
        chatRoomId: chatRoomId,
        message: message,
        isRead: false,
        isDelivered: false,
        createdAt: createdAt,
      })
    );

    messageRef.current.value = messageRef.current && "";
    scrollToBottom();
  };

  return (
    <Fragment>
      <div className="relative w-full p-4 border-t-[1px] border-gray-400">
        {/* Emoji icons */}
        <form
          onSubmit={(event) => sendMessageHandler(event)}
          className="flex items-center justify-center bg-gray-300 
          w-full p-4 py-3 rounded-full"
        >
          <input
            type="text"
            required
            ref={messageRef}
            placeholder="Type message here"
            className="flex-1 outline-none bg-inherit placeholder:text-gray-600
            cursor-text-blue-500 min-w-[180px]"
            id="input-field"
          />
          <button type="submit">
            <span className="flex items-center justify-center">
              <IconContext.Provider
                value={{ size: "1.2rem", color: "#495057" }}
              >
                <AiOutlineSend />
              </IconContext.Provider>
            </span>
          </button>
        </form>
      </div>
    </Fragment>
  );
};
