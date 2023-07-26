import React from "react";
import MainBanner from "./MainBanner";
import SplideGolf from "./SplideGolf";
import Chatbot from "./Chatbot";

import "./Main.css";

function Main() {
  return (
    <div id="Home" style={{ height: "580px" }}>
      <MainBanner />
      <SplideGolf />
      {/* <SplideLearning /> */}
      {/* <SplideAccompany /> */}
      <Chatbot />
    </div>
  );
}

export default Main;
