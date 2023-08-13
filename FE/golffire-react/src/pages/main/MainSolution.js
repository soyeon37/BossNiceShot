import { React, useContext } from "react";
import { Link } from "react-scroll";

import SplideGolf from "./SplideSolution";
import RefContext from "./RefContext";

import "./Main.css";
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/themes/theme-bruce/styles.module.scss";

function MainSolution() {
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
    <div id="MainSolution">
      <div id="index-solution">
        <div id="index-solution-1" onClick={scrollToSol}>
          솔루션
        </div>
        <div id="index-study-2" onClick={scrollToStu}>
          코칭/러닝
        </div>
        <div id="index-companion-3" onClick={scrollToCom}>
          동행모집
        </div>
        <div id="index-solution-bar">
          <span id="index-solution-bar-text">골프자세 솔루션</span>
          <div id="index-solution-border-r"></div>
          <div id="index-solution-border-l"></div>
        </div>
      </div>
      <div id="main-solution" ref={goToSolution}>
        <div id="main-solution-header">골프 자세 솔루션</div>
        <div id="main-solution-title">
          <span id="main-title-bold">골프 자세 솔루션</span>
          <span id="main-title-medium">을 받아요!</span>
        </div>
        <div id="main-solution-body">
          <div id="main-solution-left">
            {/* 솔루션 페이지 카드 */}
            <SplideGolf />
          </div>
          <div id="main-solution-right">
            <div id="main-solution-1">눈치 보면서 멀리건 쓰는 날은 이제 안녕!</div>
            <div id="main-solution-2">
              조금 더 완성도 있는 자세를 원한다면,
              <br />
              골프 자세 솔루션을 경험해보세요!
            </div>
            <div id="main-solution-3">
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
export default MainSolution;
