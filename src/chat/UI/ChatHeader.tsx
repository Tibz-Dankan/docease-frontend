import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { hideChat, showChatRecipientList } from "../../store/actions/chat";
import { IconContext } from "react-icons";
import { IoClose, IoPerson } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

interface ChatHeaderProps {
  recipientImageUrl: string;
  recipientName: string;
  recipientRole: string;
  onChatClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = (props) => {
  const dispatch: any = useDispatch();

  const hideChatHandler = () => {
    dispatch(hideChat());
    if (window.innerWidth < 640) {
      dispatch(showChatRecipientList());
    }
  };

  const showImage = props.recipientImageUrl !== "null" && true;

  return (
    <Fragment>
      <div
        className="bg-blue-400s flex items-center justify-between 
         w-full border-b-[1px] border-gray-400 px-4 py-3 shadow"
      >
        <div className="flex items-center justify-center gap-x-3">
          <div
            className="bg-gray-300 flex items-center justify-center 
            w-12 h-12 rounded-[50%] relative"
          >
            {showImage && (
              <img
                src={props.recipientImageUrl}
                alt={props.recipientName}
                className="w-full  h-full rounded-[50%] bg-gray-400"
              />
            )}
            {!showImage && (
              <span
                className="cursor-pointer grid place-items-center  bg-gray-300 
                p-1 w-12 h-12 rounded-[50%]"
              >
                <IconContext.Provider
                  value={{ size: "1.4rem", color: "#495057" }}
                >
                  <IoPerson />
                </IconContext.Provider>
              </span>
            )}
            {/* TODO: To dynamically change the color od the dot depending 
              on users online status(active[fill-green-600], active-5min-ago[fill-yellow-600] 
              active-beyond-5min[fill-gray-500])  */}
            <span
              className="absolute -right-[6px] bottom-1 w-[14px] h-[14px]
               rounded-[50%] bg-gray-50 p-[1px]s flex items-center justify-center"
            >
              <IconContext.Provider
                // value={{ size: "1.2rem", color: "#495057" }} //gray
                // value={{ size: "1.2rem", color: "#f59f00" }} //yellow
                value={{ size: "1.2rem", color: "#37b24d" }} //green
              >
                <GoDotFill />
              </IconContext.Provider>
            </span>
          </div>
          <div className="flex flex-col items-start justify-center gap-y-[-16px]">
            <span className="font-semibold text-lgs text-gray-900">
              {props.recipientName}
            </span>
            <span className="text-gray-600 text-sm first-letter:uppercase">
              {props.recipientRole}
            </span>
          </div>
        </div>
        <div>
          <span className="cursor-pointer" onClick={() => hideChatHandler()}>
            <IconContext.Provider
              value={{
                size: "1.4rem",
                color: "#495057",
              }}
            >
              <IoClose />
            </IconContext.Provider>
          </span>
        </div>
      </div>
    </Fragment>
  );
};
