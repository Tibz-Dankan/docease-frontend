import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  BsFacebook,
  BsTwitter,
  BsPinterest,
  BsInstagram,
} from "react-icons/bs";

export const Footer: React.FC = () => {
  return (
    <Fragment>
      <footer
        className="bg-primary py-8 text-gray-100 grid 
        place-items-center gap-9 px-2 sm:px-8"
      >
        <div
          className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 
           gap-8 w-full bg-green-500s"
        >
          <div className="space-y-3 w-full">
            <span className="font-bold">Company</span>
            <ul className="space-y-3">
              <li>About Us</li>
              <li>Why Choose us</li>
              <li>Pricing</li>
              <li>Testimonial</li>
            </ul>
          </div>
          <div className="space-y-3 w-full">
            <span className="font-bold">Resources</span>
            <ul className="space-y-3">
              <li>Privacy Policy</li>
              <li>Terms and Condition</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="space-y-3 w-full">
            <span className="font-bold">Product</span>
            <ul className="space-y-3">
              <li>Appointments</li>
              <li>Real-Time Messenger</li>
              <li>Real-Time Notifications</li>
              <li>Medical File Storage</li>
            </ul>
          </div>
          <div className="space-y-3 w-full">
            <span className="font-bold">Quick links</span>
            <ul className="space-y-3">
              <li>How it works</li>
              <li>Search Med Professionals</li>
              <li>Services</li>
              <li>Emergency Helpline</li>
            </ul>
          </div>
        </div>
        <div
          className="bg-green-500s w-full flex items-center justify-between
          gap-8 lg:gap-16"
        >
          <p className="w-full h-[3px] bg-gray-50 hidden sm:block"></p>
          <p className="flex items-center text-white">
            Copyright&copy;{new Date(Date.now()).getFullYear()}
          </p>
          <p className="flex items-center justify-start gap-x-4">
            <Link to="#">
              <IconContext.Provider
                value={{
                  size: "1.4rem",
                  color: "#fff",
                }}
              >
                <BsFacebook />
              </IconContext.Provider>
            </Link>
            <Link to="https://twitter.com/docease_app">
              <IconContext.Provider
                value={{
                  size: "1.4rem",
                  color: "#fff",
                }}
              >
                <BsTwitter />
              </IconContext.Provider>
            </Link>
            <Link to="https://instagram.com/docease_app?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr">
              <IconContext.Provider
                value={{
                  size: "1.4rem",
                  color: "#fff",
                }}
              >
                <BsInstagram />
              </IconContext.Provider>
            </Link>
            <Link to="#">
              <IconContext.Provider
                value={{
                  size: "1.4rem",
                  color: "#fff",
                }}
              >
                <BsPinterest />
              </IconContext.Provider>
            </Link>
          </p>
          <p className="w-full h-[3px] bg-white hidden sm:block"></p>
        </div>
      </footer>
    </Fragment>
  );
};
