import React from "react";
import "../App.css";

const SpinLoader = () => {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default SpinLoader;
