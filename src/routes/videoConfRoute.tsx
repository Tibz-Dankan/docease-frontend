import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { VideoConferencePage } from "../video-conference/pages/VideoConferencePage";
import { useSelector } from "react-redux";
import { TAuthState } from "../types/auth";

export const VideoConfRoute: React.FC = () => {
  const userRole = useSelector((state: TAuthState) => state.auth.user?.role!);

  return (
    <Fragment>
      <Routes>
        <Route
          path={`/${userRole}/video-conferencing/:videoConferenceId`}
          element={<VideoConferencePage />}
        />
      </Routes>
    </Fragment>
  );
};
