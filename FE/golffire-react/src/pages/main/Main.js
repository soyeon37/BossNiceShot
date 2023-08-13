import React from "react";
import MainBanner from "./MainBanner";
import SplideGolf from "./SplideGolf";
import SplideAccompany from "./SplideAccompany";
import SplideLearning from "./SplideLearning";
import MainSolution from "./MainSolution";
import Chatbot from "./Chatbot";

import "./Main.css";

function Main() {
  return (
    <div id="Home">
      <MainBanner />
      <MainSolution/>
      {/* <SplideGolf /> */}
      {/* <hr /> */}
      {/* <SplideLearning /> */}
      {/* <hr /> */}
      {/* <SplideAccompany /> */}

      <Chatbot />
    </div>
  );
}

export default Main;
