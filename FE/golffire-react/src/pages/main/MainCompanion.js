import { React, useContext } from "react";
import { Link } from "react-scroll";

import SplideGolf from "./SplideSolution";
import RefContext from "./RefContext";

import "./Main.css";
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/themes/theme-bruce/styles.module.scss";

function MainCompanion() {
  const { goToSolution, goToStudy, goToCompanion } = useContext(RefContext);

  const scrollToSol = () => {
    goToSolution.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToStu = () => {
    goToStudy.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToCom = () => {
    goToCompanion.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div id="MainCompanion">
      <div id="index-solution">
        <div id="index-solution-3" onClick={scrollToSol}>
          솔루션
        </div>
        <div id="index-study-2" onClick={scrollToStu}>
          코칭/러닝
        </div>
        <div id="index-companion-1" onClick={scrollToCom}>
          동행모집
        </div>
        <div id="index-solution-bar">
          <span id="index-solution-bar-text">동행 모집</span>
          <div id="index-solution-border-r"></div>
          <div id="index-solution-border-l"></div>
        </div>
      </div>
      <div id="main-solution" ref={goToCompanion}>
        <div id="main-solution-header">동행 모집</div>
        <div id="main-solution-title">
          <span id="main-title-medium">같이 티업을 나갈 </span>
          <span id="main-title-bold">동료</span>
          <span id="main-title-medium">를 찾아요!</span>
        </div>
        <div id="main-solution-body">
          <div id="main-companion-left">
            {/* 솔루션 페이지 카드 */}
            <SplideGolf />
          </div>
          <div id="main-companion-right">
            <div id="main-study-1">
              어려운 골프장 예약... 겨우 성공했는데
              <br />
              <span id="bold">같이 동행할 인원이 없으신가요?</span>
            </div>
            <div id="main-study-2">
              <span id="bold">[사장님, 나이스 샷!]</span>에서는 <span id="bold">간편하게</span>
              <br />
              같이 함께할 <span id="bold">동료</span>를 구할 수 있어요!
              <br />
            </div>
            <div id="main-study-3">
              {/* <button id="main-button">솔루션 경험하기</button> */}
              <a href="/">
                <AwesomeButton
                  id="blackbutton"
                  cssModule={AwesomeButtonStyles}
                  style={{ width: 10 + "em", height: 3 + "em", fontSize: "2em" }}
                  type="primary"
                >
                  골프 자세 솔루션
                </AwesomeButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainCompanion;
