import React, { Fragment } from "react";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { AuthLinkDropdown } from "../UI/AuthLinkDropdown";
import { Button } from "../../shared/UI/Button";
import { Image } from "../../shared/UI/Image";
import { Footer } from "../layout/Footer";
import { IconContext } from "react-icons";
import { LiaBrainSolid } from "react-icons/lia";
import { GoHistory } from "react-icons/go";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { PiChatsCircleLight } from "react-icons/pi";
import maleDoctor from "../../assets/images/male-doctor.jpeg";
import femaleDoctor from "../../assets/images/female-doctor.jpeg";

export const LandingPage: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-white bg-blue-500s">
        {/* Header section */}
        <header className="flex flex-col justify-center items-center w-full">
          <nav
            className="flex items-center justify-between w-full 
            px-4 sm:px-16 lg:px-28 py-2 sm:py-0"
          >
            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="hidden sm:block w-16 h-auto mt-2"
              />
              <span
                className="text-2xl sm:text-3xl text-primaryDark uppercase 
                font-semibold"
              >
                Doc ease
              </span>
            </div>
            <ul
              className="flex gap-4 items-center text-gray-800 text-sm
              xs:text-base"
            >
              <li>
                <AuthLinkDropdown>
                  <span className="cursor-pointer">Sign In</span>
                </AuthLinkDropdown>
              </li>
              <li className="bg-primary py-2 px-4 rounded-md text-white font-semibold">
                <Link to="/auth/patient/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
          <div
            className="w-full flex flex-col sm:flex-row items-center
            justify-center bg-blue-100  px-4 sm:px-16 
            lg:px-28 gap-4 py-4"
          >
            <div
              className="h-[60vh] w-full text-primaryDark  bg-green-500s
             flex flex-col justify-center gap-3"
            >
              <h1 className="text-3xl">
                We're Being <span className="font-semibold">Determined</span>{" "}
                for your <span className="font-semibold">better life.</span>
              </h1>
              <p>
                you can get the care you need 24/7 - From you are with your
                experienced medical practitioners
              </p>
              <p>
                <Link to="/auth/patient/signin">
                  <Button
                    label="Make appointment"
                    type="button"
                    className="px-4 w-44"
                  />
                </Link>
              </p>
            </div>
            <div className="w-full">
              <Image src={femaleDoctor} />
            </div>
          </div>
        </header>

        {/* Feature section */}
        <div
          className="flex flex-col items-center justify-center
          text-lg my-16 gap-6 w-full bg-green-500s"
        >
          <p className="uppercase text-primaryDark font-semibold">
            Our features
          </p>
          <div
            className="flex items-center justify-center px-4
           sm:px-16 lg:px-28 gap-4 sm:gap-8 lg:gap-10 flex-col xs:flex-row
           text-gray-800 text-sm"
          >
            <div
              className="flex flex-col items-center justify-between 
              gap-4"
            >
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.4rem", color: "#495057" }}
                >
                  <LiaBrainSolid />
                </IconContext.Provider>
              </span>
              <span>Mental Health</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.4rem", color: "#495057" }}
                >
                  <GoHistory />
                </IconContext.Provider>
              </span>
              <span>Medical history</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.4rem", color: "#495057" }}
                >
                  <MdOutlineCalendarMonth />
                </IconContext.Provider>
              </span>
              <span>Appointments</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.4rem", color: "#495057" }}
                >
                  <PiChatsCircleLight />
                </IconContext.Provider>
              </span>
              <span>Real-Time Messenger</span>
            </div>
          </div>
        </div>
        {/* About Us section */}
        <div
          className="flex flex-col items-center justify-center px-4
           sm:px-16 lg:px-28 mb-16"
        >
          <p className="text-primaryDark font-semibold uppercase text-center">
            About us
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <div className="w-full flex flex-col gap-3 lg:w-[450px]">
              <h2 className="text-primaryDark text-lg font-semibold">
                We are extending healthcare at your convenience
              </h2>
              <p>
                We everyone should have easy access to excellent health care.
                Our aim to make process as simple as possible for our patients
                no matter where they are - in person or at their convenience
              </p>
              <Button
                label="Learn more"
                className="bg-white border-primaryDark rounded
                text-gray-800 border-[2px] w-28"
                type="button"
              />
            </div>
            <div className="w-full lg:w-[350px]">
              <Image
                src={maleDoctor}
                className="w-full h-auto aspect-[1/1] rounded-[50%] bg-center"
              />
            </div>
          </div>
        </div>

        {/* Footer section */}
        <Footer />
      </div>
    </Fragment>
  );
};
