import React, { Fragment } from "react";
import { VideoConference } from "../layout/VideoConference";
import { Socket } from "socket.io-client";

interface VideoConferencePageProps {
  socket: Socket;
}
export const VideoConferencePage: React.FC<VideoConferencePageProps> = (
  props
) => {
  return (
    <Fragment>
      <div className="w-full h-auto">
        <VideoConference socket={props.socket} />
      </div>
    </Fragment>
  );
};
