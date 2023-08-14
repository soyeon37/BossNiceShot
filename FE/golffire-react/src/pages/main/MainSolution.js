import { React, useContext } from "react";
import SlideSolution from "./SlideSolution"
import RefContext from "./RefContext";
import "./Main.css";
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/themes/theme-bruce/styles.module.scss";
import Fade from 'react-reveal/Fade';
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
        </div>
        <div id="index-study-2" onClick={scrollToStu}>
        </div>
        <div id="index-companion-3" onClick={scrollToCom}>
        </div>
        <div id="index-solution-bar">
          <span id="index-solution-bar-text">골프자세 솔루션</span>
          <div id="index-solution-border-r"></div>
          <div id="index-solution-border-l"></div>
        </div>
      </div>
      <div id="main-solution" ref={goToSolution}>
        <Fade right>
          <div id="main-solution-header" >골프 자세 솔루션</div>
        </Fade>
        <Fade bottom>
          <div id="main-solution-title">
            <span id="main-title-bold">골프 자세 솔루션</span>
            <span id="main-title-medium">을 받아요!</span>
          </div>
        </Fade>
        <div id="main-solution-body">
          <Fade bottom>
            <div id="main-solution-left">
              {/* 솔루션 페이지 카드 */}
              <SlideSolution />
            </div>
          </Fade>
          <Fade right>
            <div id="main-solution-right">
              <div id="main-solution-1">눈치 보면서 멀리건 쓰는 날은 이제 안녕!</div>
              <div id="main-solution-2">
                조금 더 완성도 있는 자세를 원한다면,
                <br />
                골프 자세 솔루션을 경험해보세요!
              </div>
              <div id="main-solution-3">
                {/* <button id="main-button">솔루션 경험하기</button> */}
                <a href="/solution">
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
          </Fade>
        </div>
      </div>
    </div>
  );
}
export default MainSolution;
