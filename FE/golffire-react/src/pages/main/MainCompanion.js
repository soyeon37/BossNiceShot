import { React, useContext } from "react";

import SlideCompanion from "./SlideCompanion";
import RefContext from "./RefContext";

import "./Main.css";
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/themes/theme-bruce/styles.module.scss";
import Fade from 'react-reveal/Fade';

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
      <div id="index-companion">
        <div id="index-solution-3" onClick={scrollToSol}>
        </div>
        <div id="index-study-2" onClick={scrollToStu}>
        </div>
        <div id="index-companion-1" onClick={scrollToCom}>
        </div>
        <div id="index-companion-bar">
          <span id="index-solution-bar-text">동행 모집</span>
          <div id="index-companion-border-r"></div>
          <div id="index-companion-border-l"></div>
        </div>
      </div>
      <div id="main-solution" ref={goToCompanion}>
        <Fade right>
        <div id="main-solution-header">동행 모집</div>
        </Fade>
        <Fade bottom>
        <div id="main-solution-title">
          <span id="main-title-medium">같이 티업을 나갈 </span>
          <span id="main-title-bold">동료</span>
          <span id="main-title-medium">를 찾아요!</span>
        </div>
        </Fade>
        <div id="main-solution-body">
        <Fade bottom>
          <div id="main-companion-left">
            {/* 솔루션 페이지 카드 */}
            <SlideCompanion />
          </div>
          </Fade>
          <Fade right>
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
              <a href="/accompany">
                <AwesomeButton
                  id="blackbutton"
                  cssModule={AwesomeButtonStyles}
                  style={{ width: 10 + "em", height: 3 + "em", fontSize: "2em" }}
                  type="primary"
                >
                  동행 찾기
                </AwesomeButton>
              </a>
            </div>
          </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
export default MainCompanion;
