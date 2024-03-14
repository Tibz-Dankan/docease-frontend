import { Fragment } from "react";
import { IOrganizedChatMessage } from "../../types/chat";

export const MessageSecondary = (props: any) => {
  const msg: IOrganizedChatMessage = props.msg;

  return (
    <Fragment>
      <div>
        <div className="mt-1 ml-12 mr-2  inline-block">
          <p
            className={`text-sm ${
              msg.currentUserIsSender
                ? "bg-primary text-gray-50 before:bg-primary"
                : "bg-gray-300 text-gray-900 before:bg-gray-300"
            } p-4 rounded-xl 
            relative w-auto max-w-full min-h-8`}
          >
            {msg.message}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
