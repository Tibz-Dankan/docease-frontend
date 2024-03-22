import React, { Fragment } from "react";
import { ProfileCard } from "./ProfileCard";
import appImages from "../data/images.json";
import claireImage from "../../assets/images/claire.jpeg";

export const Team: React.FC = () => {
  const mogaImg = appImages.images.team.moga;
  const saidiImg = appImages.images.team.saidi;
  const nathanImg = appImages.images.team.nathan;
  const charlesImg = appImages.images.team.charles;
  const samanthaImg = appImages.images.team.samantha;
  const claireImg = claireImage;

  const members = [
    {
      name: "Moga Muzamil A.W",
      role: "Project Manager ",
      image: mogaImg,
      email: "moga.m.abdulwahab@gmail.com",
      phoneNumber: "0758057613",
      socials: {
        instagram: { link: "#", name: "MogaMAW" },
        twitter: { link: "#", name: "MogaMAW" },
        github: { link: "https://github.com/MogaMAW", name: "MogaMAW" },
      },
      basicInfo: {
        accessNumber: "A94166",
        currentYear: "3",
        course: "BSc COMPUTER SCIENCE",
      },
      description:
        "Moga is the driving force behind the DocEase project. He ensures that the team stays organized, on track, and focused on our mission. Given his problem-solving skills and a commitment to meeting deadlines, Moga keeps the project running smoothly from start to finish",
    },
    {
      name: "Muganga Charles",
      role: "Backend Developer",
      email: "mugangacharles5@gmail.com",
      phoneNumber: "0742167429",
      image: charlesImg,
      socials: {
        instagram: { link: "#", name: "muganga-charles" },
        twitter: { link: "#", name: "muganga-charles" },
        github: {
          link: "https://github.com/muganga-charles",
          name: "muganga-charles",
        },
      },
      basicInfo: {
        accessNumber: "A96447",
        currentYear: "3",
        course: "BSCS",
      },
      description:
        "Charles is our back-end wizard, working behind the scenes to develop and maintain the backend codebase of the application, managing the database and ensuring that the data is properly handled and secured.",
    },
    {
      name: "Murungi Nathan",
      role: "Front-End(UI/UX)",
      email: "murunginathan97@gmail.com",
      phoneNumber: "0755699643",
      image: nathanImg,
      socials: {
        instagram: { link: "#", name: "Nathan" },
        twitter: { link: "#", name: "Nathan" },
        github: { link: "https://github.com/Nathan9799", name: "Nathan9799" },
      },
      basicInfo: {
        accessNumber: "A94266",
        currentYear: "3",
        course: "BSIT",
      },
      description:
        "Nathan is a creative force on our team, combining front-end development with a deep passion for user interface and user experience design. He's on a mission to create an exceptional and visually captivating user experience. He ensures that every interaction on our platform is not only smooth but also aesthetically pleasing.",
    },
    {
      name: "Mukasa Saidi",
      role: "Frontend engineer",
      image: saidiImg,
      email: "mukasasaidi34@gmail.com",
      phoneNumber: "0756118850",
      socials: {
        instagram: { link: "#", name: "saidimukasa" },
        twitter: {
          link: "https://twitter.com/mukasa_saidi12",
          name: "@mukasa_saidi12",
        },
        github: { link: "https://github.com/saidimukasa", name: "saidimukasa" },
      },
      basicInfo: {
        accessNumber: "A96449",
        currentYear: "3",
        course: "BSIT",
      },
      description:
        "Saidi is a passionate front-end developer with a sharp focus on the technical aspects of the DocEase app. He brings the user interface to life through coding and ensures that the website functions flawlessly. With expertise in responsive web design and front-end technologies, Saidi is committed to delivering a seamless and high-performance user experience for our users.",
    },
    {
      name: "Samantha Ryan B",
      role: "Sales Manager",
      image: samanthaImg,
      email: "sryankryp@gmail.com",
      phoneNumber: "0740748763",
      socials: {
        instagram: { link: "#", name: "Samantha" },
        twitter: { link: "#", name: "Samantha" },
        github: { link: "https://github.com/2605", name: "2605" },
      },
      basicInfo: {
        accessNumber: "A93821",
        currentYear: "3",
        course: "BSIT",
      },
      description:
        "Samantha is our go-to person for all things sales. She's dedicated to spreading the word about DocEase. With a knack for building relationships and understanding the needs of our clients, Samantha is committed to making healthcare access more accessible for everyone.",
    },
    {
      name: "Nakaziba Ann Claire",
      role: "Sales Manager",
      image: claireImg,
      email: "nakazibaclaire6@gmail.com",
      phoneNumber: "0750740057",
      socials: {
        instagram: { link: "#", name: "ItsAnne75 " },
        twitter: { link: "#", name: "Claire" },
        github: { link: "https://github.com/Nakaziba", name: "Nakaziba" },
      },
      basicInfo: {
        accessNumber: "A95293",
        currentYear: "3",
        course: "BSIT",
      },
      description:
        "Nakaziba is our go-to person for all things sales. She's dedicated to spreading the word about DocEase. With a knack for building relationships and understanding the needs of our clients, Samantha is committed to making healthcare access more accessible for everyone.",
    },
  ];

  return (
    <Fragment>
      <div
        className="w-full flex flex-col items-center gap-8
        my-16 px-4 sm:px-16 lg:px-28"
      >
        <div className="space-y-2">
          <div
            className="w-full text-center relative bg-transparent
             z-20"
          >
            <p
              className="uppercase text-primary font-semibold text-5xl
              opacity-10"
            >
              Our Team
            </p>
            <p
              className="text-primaryDark font-semibold uppercase
               text-center absolute top-[12px] left-0 right-0 bg-purple-500s z-0"
            >
              Our Team
            </p>
          </div>
          <p className="text-gray-800">Meet our professional team</p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3
          gap-y-16  sm:gap-4 md:gap-4 lg:gap-4 justify-center 
          w-full lg:p-8"
        >
          {members.map((member, index) => (
            <div key={index} className="w-full">
              <ProfileCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
