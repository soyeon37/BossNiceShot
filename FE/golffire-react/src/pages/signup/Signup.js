import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setStateEmail,
  setStatePassword,
  setStateNickname,
  setStateIsKakao,
  setStateStep,
} from "../../features/signupSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStateStep(1));
    dispatch(setStateEmail());
    dispatch(setStatePassword());
    dispatch(setStateNickname());
    dispatch(setStateIsKakao(false));
  }, []);

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
