import { useMutation } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { getVideoConference } from "../API";
import { TAuthState } from "../../types/auth";
import { Loader } from "../../shared/UI/Loader";
import { IconContext } from "react-icons";
import { FaVideo } from "react-icons/fa";
import { updateVideoConference } from "../../store/actions/videoConference";

interface GetVideoConferenceProps {
  attendeeId: string;
}

export const GetVideoConference: React.FC<GetVideoConferenceProps> = (
  props
) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const user = useSelector((state: TAuthState) => state.auth.user!);

  const navigateToVideoConferencePage = (videoConfId: string) => {
    navigate(`/${user.role}/video-conferencing/${videoConfId}`, {
      replace: false,
    });
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: getVideoConference,
    onSuccess: (response: any) => {
      dispatch(updateVideoConference(response.data.conference));
      navigateToVideoConferencePage(
        response?.data?.conference?.videoConferenceId
      );
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const getVideoConferenceHandler = () => {
    const hostId = user.userId;
    const attendeeId = props.attendeeId;

    if (!hostId || !attendeeId) return;
    mutate({
      hostId: hostId,
      attendeeId: attendeeId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <div>
        {!isLoading && (
          <div>
            <span
              className="w-10 h-10 rounded-[50%] flex items-center 
               justify-center bg-white border-[1px] border-gray-300
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
            </span>
          </div>
        )}
        {isLoading && (
          <div
            className="w-10 h-10 text-gray-50 rounded-[50%] flex items-center 
             justify-center bg-white shadow-lg cursor-pointer border-[1px]
             border-gray-100"
          >
            <Loader className="w-6 h-6 stroke-primary" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
