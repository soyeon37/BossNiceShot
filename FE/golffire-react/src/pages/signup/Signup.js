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
import ProfilePicModal from "./ProfilePicModal";

import BackgroundImage from "../../assets/source/imgs/golf-image-2.svg";
import "./ProfilePicModal.css";
import "./Signup.css";

function Signup() {
  // Redux
  const state = useSelector((state) => state.signupFeature);
  const dispatch = useDispatch();

  const step = state.step;

  useEffect(() => {
    dispatch(setStateStep(1));
    dispatch(setStateEmail());
    dispatch(setStatePassword());
    dispatch(setStateNickname());
    dispatch(setStateProfile("green_suncap_tiger"));
    dispatch(setStateTeeBox("flagall"));
    dispatch(setStateIsKakao(false));
  }, []);

  // 사진 출력을 위한 변수
  const [imgPic, setImgPic] = useState(state.profile);
  const [imgClr, setImgClr] = useState("white");

  // 사진 배경 색상을 map으로 관리
  const colorMap = {
    "red": "#F24141",
    "yellow": "#FFE000",
    "gree": "#3BD641",
    "blue": "#80CAFF",
    "white": "#FFFFF",
  }

  // 모달 창 띄우고 내리는 변수 및 함수
  const [modalVisible, setModalVisible] = useState(false);
  const handleProfilePicModal = () => {
    setModalVisible(!modalVisible);
  }

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
      image: imgPic + "_" + imgClr,
      introduction: introduce,
      averageScore: averageScore,
      topScore: topScore,
      level: level,
      teeBox: teeBox,
      isKakao: isKakao,
    };
    console.log("isKakao: ", data.isKakao);
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

            <div className="user-banner-profile"
              onClick={handleProfilePicModal}>
              <div className="user-banner-circle"
                style={{ backgroundColor: colorMap[imgClr] }}>
                <img className="user-banner-circle-fill"
                  src={require(`../../assets/source/profile/${imgPic}.png`)} />
              </div>
            </div>

            <button className="user-func-email-login"
              onClick={handleEmailFinish}>
              <div className="user-only-text">회원가입 완료</div>
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
              <img className="user-banner-img-style" src={BackgroundImage} alt="golf-mascot-image" />
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
      {modalVisible && (
        <ProfilePicModal
          initialPic={imgPic}
          initialClr={imgClr}
          setImgPic={setImgPic}
          setImgClr={setImgClr}
          handleProfilePicModal={handleProfilePicModal}
        />
      )}

    </div >
  );
}

export default Signup;
