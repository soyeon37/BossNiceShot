import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Signup Components
import SignupChoice from "./SignupChoice";
import SignupEmail1 from "./SignupEmail1";
import SignupEmail2 from "./SignupEmail2";
import SignupInfo from "./SignupInfo";

import golfImage from "../../assets/source/icons/golf.png";
import "./Signup.css";

function Signup() {
  // Redux
  const step = useSelector((state) => state.signupFeature.step);

  return (
    <div id="Signup">
      {/* 기능 공간 */}
      <div id="signin-func">
        {step === 1 && <SignupChoice />}
        {step === 2 && <SignupEmail1 />}
        {step === 3 && <SignupEmail2 />}
        {step === 4 && <SignupInfo />}
      </div>

      {/* 그림 공간 */}
      <div id="signin-banner">
        <div id="signin-banner-image">
          <img src={golfImage} alt="banner-golf-icon" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
