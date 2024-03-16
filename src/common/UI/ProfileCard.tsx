import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTeamMember } from "../../store/actions/team";
import { twMerge } from "tailwind-merge";

type TMember = {
  image: string;
  name: string;
  role: string;
  description: string;
};

interface ProfileCardProps {
  member: TMember;
  imgClassName?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const navigateToProfilePage = () => {
    dispatch(updateTeamMember(props.member));
    navigate(`/profile/${props.member.name}`, { replace: false });
  };

  return (
    <Fragment>
      <div
        className="space-y-4 flex flex-col 
         items-center justify-center rounded-xl border-[1px]
        border-gray-200 shadow-sm w-full"
      >
        <div
          className={twMerge(
            `w-full aspect-[4/3] rounded-t-lg bg-top`,
            props.imgClassName
          )}
          style={{
            backgroundImage: `url(${props.member.image})`,
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            // backgroundPosition: "center center",
          }}
        ></div>
        <div className="text-center">
          <p className="text-base text-gray-800">{props.member.name}</p>
          <p className="text-sm text-gray-800">{props.member.role}</p>
        </div>
        <div className="text-center pb-4 w-full px-4">
          <button
            className="bg-primary rounded-md text-sm text-gray-50 
              px-4 py-2 w-full"
            onClick={() => navigateToProfilePage()}
          >
            View Profile
          </button>
        </div>
      </div>
    </Fragment>
  );
};
