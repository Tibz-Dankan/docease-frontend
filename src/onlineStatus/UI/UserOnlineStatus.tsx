import React, { Fragment, useEffect } from "react";
import { IconContext } from "react-icons";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { TOnlineStatusState } from "../../types/onlineStatus";
import { updateOnlineStatus } from "../../store/actions/onlineStatus";
import { elapsedTime } from "../../utils/elapsedTime";

interface UserOnlineStatusProps {
  userId: string;
  updatedAt: string;
  showDetailedStatus?: boolean;
}

export const UserOnlineStatus: React.FC<UserOnlineStatusProps> = (props) => {
  const userId = props.userId;
  const updatedAt = props.updatedAt;
  const showDetailedStatus = props.showDetailedStatus
    ? props.showDetailedStatus
    : false;

  const dispatch: any = useDispatch();
  const onlineStatus = useSelector(
    (state: TOnlineStatusState) => state.onlineStatus
  );

  const lastUpdatedAt = onlineStatus?.users[`${userId}`]
    ? onlineStatus?.users[`${userId}`]
    : updatedAt;

  const isGreaterThanTwoMinutes =
    new Date(Date.now()).getTime() - new Date(lastUpdatedAt).getTime() >
    1000 * 60 * 2;
  const isLessThanTwoMinutes =
    new Date(Date.now()).getTime() - new Date(lastUpdatedAt).getTime() <
    1000 * 60 * 2;
  const isGreaterThanThirtyMinutes =
    new Date(Date.now()).getTime() - new Date(lastUpdatedAt).getTime() >
    1000 * 60 * 30;
  const isLessThanThirtyMinutes =
    new Date(Date.now()).getTime() - new Date(lastUpdatedAt).getTime() <
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
      const updatedAtFromStore = onlineStatus?.users[`${userId}`];

      if (new Date(updatedAt) > new Date(updatedAtFromStore)) {
        dispatch(updateOnlineStatus({ userId: userId, updatedAt: updatedAt }));
        return;
      }

      if (!updatedAt) return;
      dispatch(updateOnlineStatus({ userId: userId, updatedAt: updatedAt }));
    };
    updateOnlineStatusHandler();
  }, []);

  return (
    <Fragment>
      {!showDetailedStatus && (
        <span
          className="w-[14px] h-[14px] rounded-[50%] bg-gray-50  
          flex items-center justify-center"
        >
          <IconContext.Provider
            value={{ size: "1.2rem", color: getIconColor() }}
          >
            <GoDotFill />
          </IconContext.Provider>
        </span>
      )}
      {showDetailedStatus && isOnline && (
        <div className="flex items-center justify-center text-sm -ml-1">
          <span className="flex items-center justify-center">
            <IconContext.Provider
              value={{ size: "1.2rem", color: getIconColor() }}
            >
              <GoDotFill />
            </IconContext.Provider>
          </span>
          <span>online</span>
        </div>
      )}
      {showDetailedStatus && !isOnline && (
        <div className="flex items-center justify-center text-sm -ml-1">
          <span className="flex items-center justify-center">
            <IconContext.Provider
              value={{ size: "1.2rem", color: getIconColor() }}
            >
              <GoDotFill />
            </IconContext.Provider>
          </span>
          <span>Last seen: {`${elapsedTime(lastUpdatedAt)} ago`}</span>
        </div>
      )}
    </Fragment>
  );
};
