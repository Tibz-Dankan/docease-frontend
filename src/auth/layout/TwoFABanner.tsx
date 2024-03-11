import React, { Fragment } from "react";
import { BannerCard } from "../../shared/UI/BannerCard";
import { Button } from "../../shared/UI/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";
import { IconContext } from "react-icons";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface TwoFABannerProps {
  onClose: (value: boolean) => void;
}

export const TwoFABanner: React.FC<TwoFABannerProps> = (props) => {
  const user = useSelector((state: TAuthState) => state.auth.user!);

  return (
    <Fragment>
      <BannerCard onClose={props.onClose}>
        <div
          className="flex items-center justify-between w-full h-full
          text-white z-[110]"
        >
          <div className="flex items-center justify-center gap-2">
            <span>
              <IconContext.Provider
                value={{
                  size: "1.2rem",
                  color: "#fff",
                }}
              >
                <IoMdInformationCircleOutline />
              </IconContext.Provider>
            </span>
            <span className="text-sm hidden sm:block">
              Please Turn on Two Factor Authentication(2FA) to secure your
              account
            </span>
            <span className="text-sm  sm:hidden">Turn on (2FA)</span>
          </div>
          <div>
            <Link to={`/${user.role}/settings?view=twofa`}>
              <Button
                type="button"
                label="Turn on"
                className="bg-green-400 text-sm px-2 py-1
                text-white shadow"
              />
            </Link>
          </div>
        </div>
      </BannerCard>
    </Fragment>
  );
};
