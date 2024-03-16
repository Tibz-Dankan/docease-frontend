import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsInstagram } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { IoMan } from "react-icons/io5";
import { Footer } from "../layout/Footer";

export const MembersPage: React.FC = () => {
  const member = useSelector((state: any) => state?.team?.currentMember);

  const getFirstWord = (inputString: string) => {
    const words = inputString.split(" ");

    return words[0];
  };

  return (
    <Fragment>
      <div className="relative min-h-[130vh]">
        <div className="w-full h-[30vh]s h-[260px] bg-[#78AEB1]s bg-primaryLight">
          <Link to="/" className="space-x-3 ml-8 pt-4 flex items-center">
            <span>
              <IconContext.Provider
                value={{
                  size: "1.2rem",
                  color: "#fff",
                }}
              >
                <GoHomeFill />
              </IconContext.Provider>
            </span>
            <span className="text-white">Home</span>
          </Link>
        </div>
        <div className="relative md:static w-full bg-blue-500s p-2">
          <div
            className="w-80 h-auto flex flex-col items-center
            justify-start space-y-4  absolute left-0 -top-24
            md:left-0 md:top-40"
          >
            <div
              className={`w-52 h-52 rounded-[50%]`}
              style={{
                backgroundImage: `url(${member?.image})`,
                backgroundSize: "cover",
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="text-start text-gray-700 space-y-2 text-base">
              <p className="">{member.name}</p>
              <p className="">{member.email}</p>
              <p className="">{member.phoneNumber}</p>
            </div>
            <ul
              className="text-start text-gray-700 space-y-2
             w-4/5 ml-16 mt-2"
            >
              <li>
                <Link
                  className="space-x-4 flex items-center"
                  to={member.socials.instagram.link}
                >
                  <span>
                    <IconContext.Provider
                      value={{
                        size: "1.2rem",
                        color: "#343a40",
                      }}
                    >
                      <BsInstagram />
                    </IconContext.Provider>
                  </span>
                  <span>{member.socials.instagram.name}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="space-x-4 flex items-center"
                  to={member.socials.twitter.link}
                >
                  <span>
                    <IconContext.Provider
                      value={{
                        size: "1.4rem",
                        color: "#343a40",
                      }}
                    >
                      <FaSquareXTwitter />
                    </IconContext.Provider>
                  </span>
                  <span>{member.socials.twitter.name}</span>
                </Link>
              </li>
              <li>
                <Link
                  className="space-x-4 flex items-center"
                  to={member.socials.github.link}
                >
                  <span>
                    <IconContext.Provider
                      value={{
                        size: "1.2rem",
                        color: "#343a40",
                      }}
                    >
                      <FaGithub />
                    </IconContext.Provider>
                  </span>
                  <span>{member.socials.github.name}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex items-center justify-center p-4 sm:p-8 mb-8
           mt-[320px] md:mt-0 text-gray-700"
        >
          {/* About */}
          <div className="w-full h-full bg-purple-500 hidden md:block"></div>
          <div className="w-full h-auto bg-blue-500s space-y-6">
            <div className="space-y-4">
              <p className="text-2xl text-[#23A6F0] font-bold">
                About {getFirstWord(member.name)}
              </p>
              <p
                className="border-[1px] border-[#23A6F0] p-4
                rounded-3xl space-y-4 shadow-md"
              >
                {member.description}
              </p>
            </div>
            {/* Basic Info */}
            <div className="space-y-4">
              <p className="text-2xl text-[#23A6F0] font-bold">Basic Info</p>
              <ul
                className="border-[1px] border-[#23A6F0] p-4
              rounded-3xl space-y-4"
              >
                <li className="space-x-4 flex items-center">
                  <span>
                    <IconContext.Provider
                      value={{
                        size: "1.6rem",
                        color: "#343a40",
                      }}
                    >
                      <RiGraduationCapFill />
                    </IconContext.Provider>
                  </span>
                  <span>Access number: {member.basicInfo.accessNumber}</span>
                </li>
                <li className="space-x-4 flex items-center">
                  <span>
                    <IconContext.Provider
                      value={{
                        size: "1.6rem",
                        color: "#343a40",
                      }}
                    >
                      <MdDone />
                    </IconContext.Provider>
                  </span>
                  <span>Current year: {member.basicInfo.currentYear}</span>
                </li>
                <li className="space-x-4 flex items-center">
                  <span>
                    <IconContext.Provider
                      value={{
                        size: "1.6rem",
                        color: "#343a40",
                      }}
                    >
                      <IoMan />
                    </IconContext.Provider>
                  </span>
                  <span>Course: {member.basicInfo.course}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};
