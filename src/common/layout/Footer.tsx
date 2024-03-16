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
        className="bg-primaryDark py-8 text-gray-100 grid 
         place-items-center gap-9 px-4 sm:px-8"
      >
        <div
          className="grid  grid-cols-1 xs:grid-cols-2s  sm:grid-cols-3 lg:grid-cols-4 
           gap-8 w-full bg-green-500s"
        >
          <div className="space-y-3 w-full">
            <span className="font-bold text-3xl uppercase">Docease</span>
            <ul className="space-y-2">
              <li>
                Doc Ease: Uganda's telehealth app with EMR integration enables
                remote consultations, secure data management, and improved
                healthcare accessibility for all.
                {/* Doc Ease is a revolutionary telehealth app integrating
                Electronic Medical Records in Uganda. Our solution enables
                remote consultations, secure data management, and seamless
                patient-provider communication. With a focus on enhancing
                healthcare delivery, minimizing delays, and improving outcomes,
                Doc Ease strives to make quality healthcare accessible to all
                Ugandans, regardless of location or circumstances. */}
              </li>
              <li className="flex items-center justify-start gap-x-4">
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
              </li>
            </ul>
          </div>
          <div className="space-y-3 w-full">
            <span className="font-bold">Quick links</span>
            <ul className="space-y-3">
              <li>About us</li>
              <li>How it works</li>
              <li>Services</li>
              <li>Testimonial</li>
            </ul>
          </div>
          <div className="space-y-3 w-full">
            <span className="font-bold">Contact Us</span>
            <ul className="space-y-3">
              <li>docease@support.com</li>
              <li>docease@gmail.com</li>
              <li>kampala, uganda</li>
              <li>+256 758057613</li>
            </ul>
          </div>
          <div className="space-y-3 w-full">
            <label htmlFor="newLetter">News Letter</label>
            <form className="w-[90% flex items-center">
              <input
                type="email"
                placeholder="Enter you email"
                required
                className="flex-1s w-full p-2 rounded-l
                 outline-none focus:border-[1px] border-primary
                 placeholder:text-sm text-gray-800"
              />
              <button className="text-gray-50 bg-secondary py-2 px-4 rounded-r">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
