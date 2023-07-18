import React from "react";
import "./full-banner.css";
import golfImage from "../../assets/source/icons/golf.png";

function MainBanner() {
  return (
    <div id="banner">
      <div id="banner-letter">
        <div id="banner-context">
          온라인으로<br />
          쉽게 골프를 배워보세요<br />
          원하는 사람과 함께<br />
          골프장에 가세요
        </div>
        
      </div>
      <div id="banner-image">
        <img
          src={golfImage}
          alt="banner-golf-icon"
        />
      </div>
    </div>
  );
}

export default MainBanner;
