import { React, useContext } from "react";

import RefContext from "./RefContext";
import SlideStudy from "./SlideStudy";
import "./Main.css";

import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import Fade from 'react-reveal/Fade';

// import 'react-awesome-button/dist/themes/bruce.css';
import AwesomeButtonStyles from "react-awesome-button/src/styles/themes/theme-bruce/styles.module.scss";
import ReactiveButton from "reactive-button";
import { margin, padding } from "@mui/system";
function MainStudy() {
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
    <div id="MainStudy">
      <div id="index-study">
        <div id="index-solution-2" onClick={scrollToSol}>
        </div>
        <div id="index-study-1" onClick={scrollToStu}>
        </div>
        <div id="index-companion-3" onClick={scrollToCom}>
        </div>
        <div id="index-study-bar">
          <span id="index-solution-bar-text">코칭/러닝룸</span>
          <div id="index-study-border-r"></div>
          <div id="index-study-border-l"></div>
        </div>
      </div>
      <div id="main-study" ref={goToStudy}>
        <Fade left>
          <div id="main-study-header">스터디</div>
        </Fade>
        <Fade bottom>

          <div id="main-study-title">
            <span id="main-title-medium">실시간으로 </span>
            <span id="main-title-bold">코칭/러닝</span>
            <span id="main-title-medium">을 경험해요!</span>
          </div>
        </Fade>

        <div id="main-study-body">
<Fade left>
          <div id="main-study-left">
            <div id="main-study-1">
              시간도, 돈도 부담된다면,
              <br />
              실시간으로 <span id="bold">코칭/러닝</span>을 이용해보세요!
            </div>
            <div id="main-study-2">
              <span id="bold">[사장님, 나이스 샷!]</span>에서는
              <br />
              실시간으로 프로, 골퍼들과 소통할 수 있어요!
            </div>
            <div id="main-study-3">
              {/* <button id="main-button">솔루션 경험하기</button> */}
              {/* <ReactiveButton rounded       idleText={'Click Me'} /> */}
              <a href="/studylist">
                <AwesomeButton
                  id="blackbutton"
                  cssModule={AwesomeButtonStyles}
                  style={{ width: 10 + "em", height: 3 + "em", fontSize: "2em" }}
                  type="primary"
                >
                  코칭/러닝 이용하기
                </AwesomeButton>
              </a>
            </div>
          </div>
          </Fade>
          <Fade bottom>

            <div id="main-study-right">
              {/* 솔루션 페이지 카드 */}
              <SlideStudy />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
export default MainStudy;
