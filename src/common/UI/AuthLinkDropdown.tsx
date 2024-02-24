import React, { Fragment, ReactNode } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface NavDropdownProps {
  children: ReactNode;
}

export const AuthLinkDropdown: React.FC<NavDropdownProps> = (props) => {
  return (
    <Fragment>
      <Menu>
        <MenuHandler>{props.children}</MenuHandler>
        <MenuList className="border-0 w-20" placeholder={""}>
          <MenuItem
            className="flex items-center justify-center"
            placeholder={""}
          >
            <span className="text-lg text-gray-800">Sign In as</span>
          </MenuItem>
          <MenuItem
            className="flex items-center justify-center"
            placeholder={""}
          >
            <Link to={`/auth/patient/signin`}>Patient</Link>
          </MenuItem>
          <MenuItem
            className="flex items-center justify-center"
            placeholder={""}
          >
            <Link to={`/auth/doctor/signin`}>Doctor</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
};
