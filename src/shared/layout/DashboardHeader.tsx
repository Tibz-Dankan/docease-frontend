import { openSidebarHandler } from "../../store/actions/sidebar";
import { useDispatch } from "react-redux";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { PiChatsCircleLight } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { IconContext } from "react-icons";
import { SearchApp } from "../UI/SearchApp";
import { NavDropdown } from "../UI/NavDropdown";
import logo from "../../assets/images/logo.jpeg";

export const DashboardHeader = () => {
  const dispatch: any = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebarHandler());
  };

  return (
    <header
      className="transition-all fixed w-full top-0 left-0
       z-40 py-3 h-16 bg-primary px-4"
    >
      <div
        className="flex flex-col-reverses justify-between 
         gap-4 sm:gap-6 md:flex-row md:items-center"
      >
        <div
          className="flex items-center gap-0 relative 
          w-12 sm:w-64"
        >
          <img
            src={logo}
            alt="logo"
            className="w-12 absolute top-0 sm:-top-1 left-0 fill-white"
          />
          <span
            className="text-gray-50 ml-11 text-2xl uppercase
            font-semibold hidden sm:block"
          >
            Docease
          </span>
        </div>

        <div
          className="flex items-center justify-center absolute top-20 
           left-0 sm:static w-full"
        >
          <SearchApp />
        </div>

        <div className="flex items-center gap-4">
          <span
            onClick={() => handleOpenSidebar()}
            className="inline-block xl:hidden cursor-pointer"
          >
            <IconContext.Provider value={{ size: "1.8rem", color: "#fff" }}>
              <IoIosMenu />
            </IconContext.Provider>
          </span>
          <span
            onClick={() => handleOpenSidebar()}
            className="inline-block cursor-pointer"
          >
            <IconContext.Provider value={{ size: "1.8rem", color: "#fff" }}>
              <PiChatsCircleLight />
            </IconContext.Provider>
          </span>
          <span
            onClick={() => handleOpenSidebar()}
            className="inline-block cursor-pointer"
          >
            <IconContext.Provider value={{ size: "1.8rem", color: "#fff" }}>
              <IoMdNotificationsOutline />
            </IconContext.Provider>
          </span>
          <NavDropdown>
            <div className="flex items-center">
              <span
                className="cursor-pointer grid place-items-center  bg-gray-300 p-1
              w-10 h-10 rounded-[50%]"
              >
                <IconContext.Provider
                  value={{ size: "1.4rem", color: "#495057" }}
                >
                  <IoPerson />
                </IconContext.Provider>
              </span>
              <span className="inline-block cursor-pointer">
                <IconContext.Provider value={{ size: "1.2rem", color: "#fff" }}>
                  <GoTriangleDown />
                </IconContext.Provider>
              </span>
            </div>
          </NavDropdown>
        </div>
      </div>
    </header>
  );
};
