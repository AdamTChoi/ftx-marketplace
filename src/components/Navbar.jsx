import React from "react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import * as Scroll from "react-scroll";
import { Link } from "react-scroll";
import FTXLogo from "../assets/ftxlogo.svg";

const Navbar = (props) => {
  const navigate = useNavigate();

  const focusHandler = () => {
    navigate("/searchgallery");
  };

  return (
    <nav className="fixed w-full h-[90px] bg-white/75 z-50 flex flex-row justify-between items-center font-inter">
      <div className="pl-2 md:pl-4">
        <RouteLink to="/">
          <img className="h-[30px] md:h-[40px]" src={FTXLogo} alt="FTX Logo" />
        </RouteLink>
      </div>
      <ul className="pr-2 md:pr-4 flex flex-row items-center justify-center">
        <Link to="gallery" smooth={true} duration={200}>
          <li className="px-4 py-2 tracking-wider border-4 hidden sm:flex hover:translate-y-[-3px] duration-300 border-[#11A9BC] font-semibold text-lg rounded-lg font-inter cursor-pointer text-[#11A9BC]">
            Explore
          </li>
        </Link>
        <li className="h-full px-2 md:px-4 font-inter flex flex-row justify-center items-center">
          <input
            className="tracking-wide rounded-lg w-[140px] md:w-[195px] px-2 md:px-4 py-2 border-4 text-[#33BBC7] focus:w-[150px] md:focus:w-[225px] duration-300 font-semibold border-[#33BBC7]"
            placeholder="Search Collections"
            onChange={props.search}
            onFocus={focusHandler}
            value={props.value}
            onBlur={props.blur}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
