import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import * as Scroll from "react-scroll";
import { Link } from "react-scroll";
import HeroLogo from "../assets/hero.jpg";
import AnimatedPage from "../ui/AnimatedPage";

const Hero = () => {
  let Link = Scroll.Link;

  return (
    <AnimatedPage>
      <div className=" w-full h-screen bg-[#84D6D7] font-inter">
        <div className="pt-[90px] max-w-[1400px] mx-auto px-4 sm:px-12 flex flex-row justify-between items-center h-full">
          <div className="max-w-[700px] flex flex-col justify-center">
            <p className="text-white text-5xl md:text-8xl font-bold drop-shadow-2xl">
              Let's find your masterpiece{" "}
              <span className="underline drop-shadow-lg">today.</span>
            </p>
            <p className="text-white font-semibold text-2xl lg:text-4xl py-8 drop-shadow-xl">
              FTX is making it easier than ever to take home a piece of art
              right into your pocket.
            </p>
            <div>
              <Link to="gallery" smooth={true} duration={200}>
                <button className="font-bold border-4 text-xl md:text-2xl group px-6 py-3 my-2 flex items-center border-slate-800 hover:border-[#11A9BC] hover:bg-white rounded hover:text-[#11A9BC]">
                  Explore
                  <span className="group-hover:rotate-90 duration-300 group-hover:ml-3">
                    <HiArrowNarrowRight className="ml-2" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="pl-4 transition-shadow ease-in-out shadow-none   duration-300 hidden lg:flex justify-center items-center">
            <img
              className="shadow-lg hover:shadow-2xl duration-300 rounded-3xl"
              src={HeroLogo}
              alt="Colorful mayan skull"
            />
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Hero;
