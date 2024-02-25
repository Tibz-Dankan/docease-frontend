import { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { AppDate } from "../../utils/appDate";
import { IOrganizedChatMessage } from "../../types/chat";

export const MessagePrimary = (props: any) => {
  const time = () => new AppDate(msg.createdAt).time();
  const msg: IOrganizedChatMessage = props.msg;

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
              className="w-full  h-full rounded-[50%]"
            />
          )}
          {!msg.userImageUrl && (
            <svg className="w-6 h-6 fill-gray-600">
              <use href={`${sprite}#icon-person-filled`}></use>
            </svg>
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
          <p
            className={`text-sm ${
              msg.currentUserIsSender
                ? "bg-primary text-gray-light-2 before:bg-primary"
                : "bg-gray-light-3 text-gray-900 before:bg-gray-light-3"
            }
           p-4 rounded-xl 
           rounded-tl-none relative before:absolute before:top-[-1px] before:left-[-2px] 
           before:h-4 before:w-4  before:skew-y-[32deg] before:z-20
           before:rotate-[-32deg] w-auto max-w-full min-h-8 z-30`}
          >
            {msg.message}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
