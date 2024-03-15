import { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { AppDate } from "../../utils/appDate";
import { IOrganizedChatMessage, TChatState } from "../../types/chat";
import { IconContext } from "react-icons";
import { IoPerson } from "react-icons/io5";
import { DotsLoader } from "../../shared/UI/Loader/DotsLoader";
import { useSelector } from "react-redux";

export const MessagePrimary = (props: any) => {
  const time = () => new AppDate(msg.createdAt).time();
  const msg: IOrganizedChatMessage = props.msg;
  const postingMessage = useSelector(
    (state: TChatState) => state.chat.postMessaging
  );

  const isPosting = postingMessage.isPosting;
  const isSameMessage = postingMessage.message === msg.message;
  const isSameMessageDate = postingMessage.createdAt === msg.createdAt;
  const isPostingMessage = isPosting && isSameMessage && isSameMessageDate;

  return (
    <Fragment>
      <div className="bg-green- flex items-start gap-x-3 bg-green-500s">
        <div
          className="bg-gray-light-3 flex items-center justify-center 
           w-10 h-10 rounded-[50%] relative"
        >
          {msg.userImageUrl && (
            <img
              src={msg.userImageUrl}
              alt={msg.username}
              className="w-full  h-full rounded-[50%] bg-gray-400"
            />
          )}
          {!msg.userImageUrl && (
            <span
              className="grid place-items-center bg-gray-400 
               w-full h-full rounded-[50%]"
            >
              <IconContext.Provider
                value={{ size: "1.2rem", color: "#495057" }}
              >
                <IoPerson />
              </IconContext.Provider>
            </span>
          )}
        </div>
        <div className="flex-1 mr-2 space-y-2">
          <div className="flex items-center gap-x-1">
            <span className="text-gray-700">{msg.username}</span>
            <svg className="w-3 h-3 fill-gray-500">
              <use href={`${sprite}#icon-dot`}></use>
            </svg>
            <span className="text-sm text-gray-500">{time()}</span>
          </div>
          <div
            className={`text-sm ${
              msg.currentUserIsSender
                ? "bg-primary text-gray-50 before:bg-primary"
                : "bg-gray-300 text-gray-900 before:bg-gray-300"
            }
           p-4 rounded-xl 
           rounded-tl-none relative before:absolute before:top-[-1px] before:left-[-2px] 
           before:h-4 before:w-4  before:skew-y-[32deg] before:z-20
           before:rotate-[-32deg] w-auto max-w-full min-h-8 z-30`}
          >
            {msg.message}
            {isPostingMessage && (
              <div className="absolute -bottom-[5px] right-4">
                <DotsLoader
                  className={`w-8 h-8 ${
                    msg.currentUserIsSender ? "text-gray-50" : "text-gray-600"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
