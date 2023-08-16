import React, { useRef } from "react";
import MainBanner from "./MainBanner";
import SplideGolf from "./SplideGolf";
import SplideAccompany from "./SplideAccompany";
import SplideLearning from "./SplideLearning";
import MainSolution from "./MainSolution";
import MainStudy from "./MainStudy";
import MainCompanion from "./MainCompanion";
import Chatbot from "./Chatbot";
import RefContext from "./RefContext";

import Footer from "./Footer";

import "./Main.css";


function Main() {
  const goToSolution = useRef();
  const goToStudy = useRef();
  const goToCompanion = useRef();
  return (
    <RefContext.Provider value={{ goToSolution, goToStudy, goToCompanion }}>
      <div id="Home">
        <MainBanner />
        <MainSolution />
        <MainStudy />
        <MainCompanion />
        <Chatbot />
        <Footer />
      </div>
    </RefContext.Provider>
  );
}

export default Main;
