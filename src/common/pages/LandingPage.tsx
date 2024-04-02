import React, { Fragment } from "react";
import logo from "../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { AuthLinkDropdown } from "../UI/AuthLinkDropdown";
import { Button } from "../../shared/UI/Button";
import { Image } from "../../shared/UI/Image";
// import { Footer } from "../layout/Footer";
import { IconContext } from "react-icons";
import { SlCloudUpload } from "react-icons/sl";
import { PiFileCloudLight, PiBrainLight } from "react-icons/pi";
import { VscHistory } from "react-icons/vsc";
import { CiCalendarDate } from "react-icons/ci";
import { PiChatsCircleLight } from "react-icons/pi";
import maleDoctor from "../../assets/images/male-doctor.jpeg";
import femaleDoctor from "../../assets/images/female-doctor.jpeg";
import { SquareDots } from "../UI/SquareDots";
import { LandingAppointmentSection } from "../layout/LandingAppointmentSection";
import { ContactUs } from "../layout/ContactUs";
import { NewsLetter } from "../layout/NewsLetter";
import { Footer } from "../../shared/layout/Footer";

export const LandingPage: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-white bg-blue-500s">
        {/* Header section */}
        <header className="flex flex-col justify-center items-center w-full">
          <nav
            className="flex items-center justify-between w-full 
            px-4 sm:px-16 lg:px-28 py-2 sm:py-0 z-20 bg-white"
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
              <li
                className="py-1 px-4 rounded-3xl text-gray-800 
                border-2 border-primary"
              >
                <Link to="/auth/patient/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
          <div
            className="w-full flex flex-col sm:flex-row items-center
             sm:items-start justify-start sm:justify-center  bg-transparent 
             px-[16px] sm:px-16 lg:px-28 gap-4 pb-4 pt-4 lg:pt-20 relative"
          >
            <SquareDots
              className="absolute top-24 left-12 md:left-20
              z-[1] opacity-[60%] hidden sm:grid grid-cols-5"
              size={"w-2 h-2"}
              bgColor={"bg-gray-200"}
              gap={"gap-[6px]"}
              filled={true}
            />
            <SquareDots
              className="absolute top-28 right-2 sm:right-6 md:right-12
              xl:right-32 z-[1] hidden sm:grid grid-cols-5"
              size={"w-4 h-4"}
              bgColor={""}
              borderColor={"border-gray-200"}
              gap={"gap-3"}
              filled={false}
              applyShadow={true}
            />
            <div
              className="bg-blue-100 w-fulls w-[130vw] h-fulls h-[100vh] 
              absolute -top-72 -left-20 rounded-bl-[35%] -rotate-[20deg] z-0"
            />
            <div
              className="h-[60vh] w-full md:w-[400px] text-primaryDark
              flex flex-col justify-start pt-8 sm:pt-12 gap-3 z-10"
            >
              <h1 className="text-2xl sm:text-3xl">
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
                    className="px-4 w-44 rounded-3xl"
                  />
                </Link>
              </p>
            </div>
            <div
              className="w-full md:w-[500px] rounded-t-[60%] rounded-b-[50%] 
               z-10 hidden sm:block"
            >
              <Image
                src={femaleDoctor}
                className="rounded-t-[60%] rounded-b-[50%]"
              />
            </div>
          </div>
        </header>

        {/* Feature section */}
        <div
          className="flex flex-col items-center justify-center
          text-lg my-16 gap-6 w-full"
        >
          <div
            className="w-full text-center relative bg-transparent
             z-20"
          >
            <p
              className="uppercase text-primary text-gray-600s font-semibold text-5xl
              opacity-10"
            >
              Our features
            </p>
            <p
              className="text-primaryDark font-semibold uppercase
               text-center absolute top-[10px] left-0 right-0 bg-purple-500s z-0"
            >
              Our features
            </p>
          </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-6 text-gray-600 
             text-sm gap-6 sm:gap-4 w-full sm:w-auto px-4"
          >
            <div
              className="flex flex-col items-center justify-center
               gap-4 w-full"
            >
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{
                    size: "2.4rem",
                    color: "#868e96",
                    style: { fontWeight: 100 },
                  }}
                >
                  <PiBrainLight />
                </IconContext.Provider>
              </span>
              <span className="text-center">Mental Health</span>
            </div>
            <div
              className="flex flex-col items-center justify-center
               gap-4 w-full"
            >
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.0rem", color: "#868e96" }}
                >
                  <VscHistory />
                </IconContext.Provider>
              </span>
              <span className="text-center">Medical History</span>
            </div>
            <div
              className="flex flex-col items-center justify-center
               gap-4 w-full"
            >
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.4rem", color: "#868e96" }}
                >
                  <CiCalendarDate />
                </IconContext.Provider>
              </span>
              <span className="text-center">Appointments</span>
            </div>
            <div
              className="flex flex-col items-center justify-center
               gap-4 w-full"
            >
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.4rem", color: "#868e96" }}
                >
                  <PiChatsCircleLight />
                </IconContext.Provider>
              </span>
              <span className="text-center">Real-Time Messenger</span>
            </div>
            <div
              className="flex flex-col items-center justify-center
               gap-4 w-full"
            >
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.0rem", color: "#868e96" }}
                >
                  <SlCloudUpload />
                </IconContext.Provider>
              </span>
              <span className="text-center">File Upload</span>
            </div>
            <div
              className="flex flex-col items-center justify-center
               gap-4 w-full"
            >
              <span className="inline-block cursor-pointer">
                <IconContext.Provider
                  value={{ size: "2.0rem", color: "#868e96" }}
                >
                  <PiFileCloudLight />
                </IconContext.Provider>
              </span>
              <span className="text-center">File Storage</span>
            </div>
          </div>
        </div>

        {/* About Us section */}
        <div
          className="flex flex-col items-center justify-center px-4
           sm:px-16 lg:px-28 mb-16 relative gap-8"
        >
          <div
            className="w-full text-center relative bg-transparent
             z-20"
          >
            <p
              className="uppercase text-primary font-semibold text-5xl
              opacity-10"
            >
              About us
            </p>
            <p
              className="text-primaryDark font-semibold uppercase
               text-center absolute top-[12px] left-0 right-0 z-0"
            >
              About us
            </p>
          </div>
          <div
            className="flex flex-col sm:flex-row gap-6 items-center
             justify-center z-10"
          >
            <div className="w-full flex flex-col gap-3 lg:w-[450px]">
              <h2 className="text-primaryDark text-xl font-semibold">
                We are extending healthcare at your convenience
              </h2>
              <p className="text-gray-800">
                Everyone should have easy access to excellent health care. Our
                aim to make process as simple as possible for our patients no
                matter where they are - in person or at their convenience
              </p>
              <Link to="/auth/patient/signup">
                <Button
                  label="Get Started"
                  className="bg-white border-primaryDark rounded-3xl
                  text-gray-800 border-[2px] w-32"
                  type="button"
                />
              </Link>
            </div>
            <div className="w-full lg:w-[350px] relative z-20">
              <Image
                src={maleDoctor}
                className="w-full h-auto aspect-[1/1] rounded-[50%]
                bg-center"
              />
              <SquareDots
                className="absolute bottom-0 sm:right-4 
                z-[1] opacity-[30%] hidden sm:grid grid-cols-5"
                size={"w-2 h-2"}
                bgColor={"bg-gray-600"}
                gap={"gap-[6px]"}
                filled={true}
              />
            </div>
          </div>
          <SquareDots
            className="absolute top-8 left-12 md:left-20
            z-[1] opacity-[40%] hidden sm:grid grid-cols-5"
            size={"w-2 h-2"}
            bgColor={"bg-primaryLight"}
            gap={"gap-[6px]"}
            filled={true}
          />
          <SquareDots
            className="absolute top-2 right-2 sm:right-6 md:right-12
            xl:right-32 z-[1] hidden sm:grid grid-cols-5"
            size={"w-4 h-4"}
            bgColor={""}
            borderColor={"border-blue-100"}
            gap={"gap-3"}
            filled={false}
            applyShadow={false}
          />
        </div>
        {/* Appointment Section */}
        <div className="px-4 sm:px-16 lg:px-28">
          <LandingAppointmentSection />
        </div>
        {/* Contact us Section */}
        <div className="mt-24 w-full">
          <ContactUs />
        </div>
        {/* Contact us Section */}
        <div className="w-full bg-blue-50 py-[3px]">
          <NewsLetter />
        </div>
        {/* Footer section */}
        <Footer />
      </div>
    </Fragment>
  );
};
