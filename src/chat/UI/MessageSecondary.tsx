import { Fragment } from "react";
import { IOrganizedChatMessage } from "../../../types/chat.ts";

export const MessageSecondary = (props: any) => {
  const msg: IOrganizedChatMessage = props.msg;

  return (
    <Fragment>
      <div>
        <div className="mt-1 ml-12 mr-2  inline-block">
          <p
            className={`text-sm ${
              msg.currentUserIsSender
                ? "bg-primary text-gray-light-2"
                : "bg-gray-light-3 text-gray-900"
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
