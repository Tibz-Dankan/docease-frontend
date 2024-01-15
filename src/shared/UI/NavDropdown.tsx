import React, { Fragment, ReactNode } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TAuthState } from "../../types/auth";
import { logOut } from "../../store/actions/auth";

interface NavDropdownProps {
  children: ReactNode;
}

export const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const userRole = useSelector((state: TAuthState) => state.auth.user?.role);
  const dispatch: any = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <Fragment>
      <Menu>
        <MenuHandler>{props.children}</MenuHandler>
        <MenuList className="border-0 w-20" placeholder={""}>
          <MenuItem
            className="flex items-center justify-center"
            placeholder={""}
          >
            <Link to={`/${userRole}/settings`}>Account</Link>
          </MenuItem>
          <MenuItem
            className="flex items-center justify-center"
            placeholder={""}
            onClick={() => logOutHandler()}
          >
            <span>Log out</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
};
