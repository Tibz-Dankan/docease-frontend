import React, { Fragment } from "react";
import { VideoConference } from "../layout/VideoConference";

export const VideoConferencePage: React.FC = () => {
  return (
    <Fragment>
      <div className="w-full h-auto">
        <VideoConference />
      </div>
    </Fragment>
  );
};
