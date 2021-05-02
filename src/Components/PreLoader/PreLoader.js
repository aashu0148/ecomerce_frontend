import React from "react";

import "./Preloader.css";

function PreLoader() {
  return (
    <div className="preloader_container">
      <div className="preloader">
        <span className="preloader_light"></span>
        <span></span>
        <span></span>
        <span className="preloader_light"></span>
      </div>
    </div>
  );
}

export default PreLoader;
