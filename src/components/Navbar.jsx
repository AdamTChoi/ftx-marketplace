import React, { useEffect } from "react";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import FTXLogo from "../assets/ftxlogo.svg";

const Navbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const focusHandler = () => {
    navigate("/searchgallery");
  };

  useEffect(() => {
    if (props.query === "") {
      return;
    } else {
      props.setQuery("");
    }
  }, [location.pathname]);

  return (
    <nav className="fixed w-full h-[90px] bg-white/75 z-50 flex flex-row justify-between items-center font-inter">
      <div className="pl-2 md:pl-4">
        <RouteLink to="/">
          <img className="h-[30px] md:h-[40px]" src={FTXLogo} alt="FTX Logo" />
        </RouteLink>
      </div>
      <ul className="pr-2 md:pr-4 flex flex-row items-center justify-center">
        <Link to="gallery" smooth={true} duration={300}>
          <li className="px-4 py-2 tracking-wider border-4 hidden sm:flex hover:translate-y-[-3px] duration-300 border-[#11A9BC] font-semibold text-lg rounded-lg font-inter cursor-pointer text-[#11A9BC] ">
            Explore
          </li>
        </Link>

        <li className="h-full px-2 md:px-4 font-inter flex flex-row justify-center items-center">
          <input
            className="tracking-wide rounded-lg w-[140px] md:w-[200px] px-2 md:px-4 py-[10px] border-4 text-[#33BBC7] focus:w-[180px] md:focus:w-[235px] duration-300 font-semibold border-[#11A9BC] "
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
