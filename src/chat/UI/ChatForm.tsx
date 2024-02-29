import { useMutation } from "@tanstack/react-query";
import React, { Fragment, useRef } from "react";
import { IconContext } from "react-icons";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToMessageList } from "../../store/actions/chat";
import { postChat } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TAuthState, TUser } from "../../types/auth";
import { generateChatRoomId } from "../../utils/generateChatRoomId";

// interface ChatFormProps {
//   // onSubmit: (message: string) => void;
// }

// export const ChatForm: React.FC<ChatFormProps> = (props) => {
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

  // const newMessage: IChatMessage = {
  //   senderId: currentUser.userId,
  //   recipientId: recipient.userId,
  //   chatRoomId: chatRoomId,
  //   message: chatMessage,
  //   isRead: false,
  //   isDelivered: false,
  //   createdAt: createdAt,
  // };

  // send chat message via http

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: postChat,
    onSuccess: (response: any) => {
      // dispatch(authenticate(response));
      console.log("response chat: ", response);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  console.log("isLoading :", isLoading);

  const sendMessageHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const createdAt = new Date().toISOString();
    const message: string = messageRef.current;

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
  };
  // const onSubmitMessageHandler = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const message: string = messageRef.current && messageRef.current?.value;
  //   if (!message) return;
  //   props.onSubmit(message);
  //   messageRef.current.value = messageRef.current && "";
  // };

  return (
    <Fragment>
      <div className="relative w-full">
        {/* <div className="relative bg-green-500s p-1 pt-3">
          <div className="flex items-center gap-x-2 absolute -top-3">
            <svg className="w-6 h-6 fill-gray-600 cursor-pointer">
              <use href={`${sprite}#icon-gif`}></use>
            </svg>
            <svg className="w-6 h-6 fill-gray-600 cursor-pointer">
              <use href={`${sprite}#icon-emoji`}></use>
            </svg>
          </div>
        </div> */}
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
