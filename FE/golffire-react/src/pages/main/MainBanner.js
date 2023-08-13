import React from "react";
import golf from "../../assets/source/icons/golf.png";
import mainImg from "../../assets/source/imgs/main.svg";
function MainBanner() {
  return (
    <div id="banner">
      <div id="banner-image">
        <img
        id="banner-img"
          src={mainImg}
          alt="banner-golf-icon"
        />
        <div id="banner-context-top">
          사장님, 나이스 샷!
        </div>
        <div id="banner-context-bottom">
          올바른 스윙 자세를 배우고,<br />
          원하는 사람들과 티업을 나가요!</div>
      </div>
    </div>
  );
}

export default MainBanner;
