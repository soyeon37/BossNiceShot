import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setStateEmail,
  setStatePassword,
  setStateNickname,
  setStateProfile,
  setStateTeeBox,
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
  const state = useSelector((state) => state.signupFeature);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStateStep(1));
    dispatch(setStateEmail());
    dispatch(setStatePassword());
    dispatch(setStateNickname());
    dispatch(setStateProfile("green_suncap_tiger"));
    dispatch(setStateTeeBox("flagall"));
    dispatch(setStateIsKakao(false));
  }, []);

  const step = state.step;
  const [image, setImage] = useState(state.profile);

  const ProfileURL = "../../assets/source/profile/";

  // 회원 가입 완료를 위한 함수들
  const navigate = useNavigate();
  const handleEmailFinish = () => {
    const email = state.email;
    const password = state.password;
    const nickname = state.nickname;
    const introduce = state.introduce;
    const averageScore = state.averageScore;
    const topScore = state.topScore;
    const teeBox = state.teeBox;
    const isKakao = state.isKakao;

    var referrer = document.referrer;
    console.log("이전 페이지 URL: " + referrer);

    let level = "";
    if (averageScore <= 60) {
      level = "이글 플레이어";
    } else if (averageScore <= 70) {
      level = "버디 플레이어";
    } else if (averageScore <= 80) {
      level = "파 플레이어";
    } else if (averageScore <= 90) {
      level = "보기 플레이어";
    } else {
      level = "더블 플레이어";
    }
    const data = {
      id: email,
      password: password,
      nickname: nickname,
      image: image,
      introduction: introduce,
      averageScore: averageScore,
      topScore: topScore,
      level: level,
      teeBox: teeBox,
      isKakao: isKakao,
    };
    console.log("isKakao: ", isKakao);
    const apiUrl = "http://localhost:8080/members/sign-up";
    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log(response);
        console.log(response.data.data.id);
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error: ", error);
        navigate("/error");
      });

    console.log("data: ", data);
    // navigate("/");
  };

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
        {step === 1 ? (
          <div className="user-banner">
            <div className="user-banner-box">
              <div className="user-banner-normal">나만의&nbsp;</div>
              <div className="user-banner-bold">프로필</div>
              <div className="user-banner-normal">을</div>
            </div>
            <div className="user-banner-box">
              <div className="user-banner-bold">선택</div>
              <div className="user-banner-normal">해주세요!</div>
            </div>

            <div className="user-banner-profile">
              <div className="user-banner-circle">
                {/* <img src={BackgroundImgage} /> */}
                {/* <image src={BackgroundImgage} /> */}
                <img className="user-banner-circle-fill"
                  src={ProfileURL + image + ".png"} alt="사용자 프로필 사진" />
              </div>
            </div>

            <button className="user-func-email-login"
              onClick={handleEmailFinish}>
              <div className="user-button-text">회원가입 완료</div>
            </button>
          </div>
        ) : (
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
        )}

        {/* 배경 및 모양 관련 div */}
        <div className="user-container-bump"></div>
      </div>
      <div className="user-container-shadow">
        <div className="user-container-shadow-bump"></div>
      </div>

      {/* 프로필 꾸미기 Modal */}
      {/* color_clothes_animal.png */}
      {/* green, red, yellow */}
      {/* cap, hat, suncap */}
      {/* bear, panda, rabbit, tiger */}

    </div >
  );
}

export default Signup;
