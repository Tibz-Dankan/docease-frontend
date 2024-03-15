import { Fragment } from "react";
import { IOrganizedChatMessage, TChatState } from "../../types/chat";
import { DotsLoader } from "../../shared/UI/Loader/DotsLoader";
import { useSelector } from "react-redux";

export const MessageSecondary = (props: any) => {
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
      <div>
        <div className="mt-1 ml-12 mr-2  inline-block">
          <div
            className={`text-sm ${
              msg.currentUserIsSender
                ? "bg-primary text-gray-50 before:bg-primary"
                : "bg-gray-300 text-gray-900 before:bg-gray-300"
            } p-4 rounded-xl 
            relative w-auto max-w-full min-h-8`}
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
