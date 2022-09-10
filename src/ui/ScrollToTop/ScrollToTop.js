import React, { useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    });
  }, []);

  const scrollTop = (elementRef) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showScrollTopButton && (
        <FaAngleDoubleUp className="top-btn" onClick={scrollTop} />
      )}
    </div>
  );
};

export default ScrollToTop;
