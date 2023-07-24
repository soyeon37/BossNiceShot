import React from "react";
import golf from "../../assets/source/icons/golf.png";

function MainBanner() {
  return (
    <div id="banner">
      <div id="banner-context">
        <div id="banner-letter">
          온라인으로<br />
          쉽게 골프를 배워보세요<br />
          원하는 사람과 함께<br />
          골프장에 가세요
        </div>

      </div>
      <div id="banner-image">
        <img
          src={golf}
          alt="banner-golf-icon"
        />
      </div>
    </div>
  );
}

export default MainBanner;
