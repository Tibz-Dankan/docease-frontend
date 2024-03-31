import React, { Fragment, useEffect } from "react";
import { IconContext } from "react-icons";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { TOnlineStatusState } from "../../types/onlineStatus";
import { updateOnlineStatus } from "../../store/actions/onlineStatus";

interface UserOnlineStatusProps {
  userId: string;
  updatedAt: string;
}

export const UserOnlineStatus: React.FC<UserOnlineStatusProps> = (props) => {
  // use different colors to different meaning of the colors
  // calculate elapsed time
  // use different colors to different meaning of the colors
  const userId = props.userId;
  const updatedAt = props.updatedAt;

  const dispatch: any = useDispatch();
  const onlineStatus = useSelector(
    (state: TOnlineStatusState) => state.onlineStatus
  );

  const updatedAtFromStore = onlineStatus.users[`${userId}`];

  const isGreaterThanTwoMinutes =
    new Date(Date.now()).getTime() - new Date(updatedAtFromStore).getTime() >
    1000 * 60 * 2;
  const isLessThanTwoMinutes =
    new Date(Date.now()).getTime() - new Date(updatedAtFromStore).getTime() <
    1000 * 60 * 2;
  const isGreaterThanThirtyMinutes =
    new Date(Date.now()).getTime() - new Date(updatedAtFromStore).getTime() >
    1000 * 60 * 30;
  const isLessThanThirtyMinutes =
    new Date(Date.now()).getTime() - new Date(updatedAtFromStore).getTime() <
    1000 * 60 * 30;

  const isOnline: boolean = isLessThanTwoMinutes;

  const hasBeenOnlineWithinThirtyMinutes: boolean =
    isGreaterThanTwoMinutes && isLessThanThirtyMinutes;

  const isBeyondThirtyMinutesSinceLastSeen: boolean =
    isGreaterThanThirtyMinutes;

  const getIconColor = (): string => {
    if (isOnline) return "#37b24d"; //green
    if (hasBeenOnlineWithinThirtyMinutes) return "#f59f00"; //yellow
    if (isBeyondThirtyMinutesSinceLastSeen) return "#495057"; //gray
    return "#495057"; //gray
  };

  useEffect(() => {
    const updateOnlineStatusHandler = () => {
      const updatedAtFromStore = onlineStatus.users[`${userId}`];
      if (new Date(updatedAt) > new Date(updatedAtFromStore)) {
        dispatch(updateOnlineStatus({ userId: userId, updatedAt: updatedAt }));
      }
    };
    updateOnlineStatusHandler();
    //   }, [onlineStatus, dispatch]);
  }, []);

  return (
    <Fragment>
      <span
        className="w-[14px] h-[14px] rounded-[50%] bg-gray-50  
        flex items-center justify-center"
      >
        <IconContext.Provider
          // value={{ size: "1.2rem", color: "#495057" }} //gray
          // value={{ size: "1.2rem", color: "#f59f00" }} //yellow
          // value={{ size: "1.2rem", color: "#37b24d" }} //green
          value={{ size: "1.2rem", color: getIconColor() }} //green
        >
          <GoDotFill />
        </IconContext.Provider>
      </span>
    </Fragment>
  );
};
