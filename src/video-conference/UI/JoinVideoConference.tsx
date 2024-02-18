import { useMutation } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { joinVideoConference } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";

interface JoinVideoConferenceProps {
  videoConferenceId: string;
  peerId: string;
  onJoin: (joined: boolean) => void;
}

export const JoinVideoConference: React.FC<JoinVideoConferenceProps> = (
  props
) => {
  const dispatch: any = useDispatch();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const hasJoinedVideoConference = () => {
    props.onJoin(true);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: joinVideoConference,
    onSuccess: (response: any) => {
      console.log("response->", response);
      hasJoinedVideoConference();
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const joinVideoConferenceHandler = () => {
    const peerId = props.peerId;
    const videoConferenceId = props.videoConferenceId;

    if (!peerId || !videoConferenceId) return;
    mutate({
      peerId: peerId,
      videoConferenceId: videoConferenceId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div>
        {!isLoading && (
          <div>
            {/* <span
              className="w-10 h-10 rounded-[50%] flex items-center 
               justify-center bg-white border-[1px] border-gray-100
               shadow-lg cursor-pointer"
              onClick={() => getVideoConferenceHandler()}
            >
              <IconContext.Provider
                value={{
                  size: "1.0rem",
                  color: "#42968D",
                }}
              >
                <FaVideo />
              </IconContext.Provider>
            </span> */}
            <Button
              type="button"
              label="Join"
              onClick={() => joinVideoConferenceHandler()}
              className="w-10 h-10"
            />
          </div>
        )}
        {isLoading && (
          <div
            className="w-10 py-2  rounded flex items-center 
             justify-center bg-primary"
          >
            <Loader className="w-6 h-6 stroke-gray-50" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
