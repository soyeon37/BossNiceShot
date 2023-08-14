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

import BackgroundImgage from "../../assets/source/imgs/golf-image-2.png";
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

      <div className="user-container">
        <div className="user-func">
          <div className="user-func-title">회원가입</div>
          {step === 1 && <SignupChoice />}
          {step === 2 && <SignupEmail1 />}
          {step === 3 && <SignupEmail2 />}
          {step === 4 && <SignupInfo />}
        </div>
        <div className="user-banner">
          <div className="user-banner-title">
            만나서 반가워요!
          </div>
          <div className="user-banner-context">
            같이 시작해볼까요?
          </div>
          <div className="user-banner-img">
            <img className="user-banner-img-style" src={BackgroundImgage} alt="golf-mascot-image" />
          </div>
        </div>

        {/* 배경 및 모양 관련 div */}
        <div className="user-container-bump"></div>
      </div>
      <div className="user-container-shadow">
        <div className="user-container-shadow-bump"></div>
      </div>

    </div>
  );
}

export default Signup;
