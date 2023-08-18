import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setStateStep,
  setStateEmail,
  setStatePassword,
  setStateNickname,
  setStateProfile,
  // setStateIntroduce,
  // setStateAverageScore,
  // setStateTopScore,
  // setStateTeeBox,
  setStateIsKakao,
} from "../../features/signupSlice";

// Signup Components
import SignupChoice from "./SignupChoice";
import SignupEmail1 from "./SignupEmail1";
import SignupEmail2 from "./SignupEmail2";
// import SignupInfo from "./SignupInfo";
import ProfilePicModal from "./ProfilePicModal";

import flagred from '../../assets/source/icons/flag-red.png';
import flagwhite from '../../assets/source/icons/flag-white.png';
import flagblack from '../../assets/source/icons/flag-black.png';
import flagall from '../../assets/source/icons/flag-all.png';

import BackgroundImage from "../../assets/source/imgs/golf-image-2.svg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./ProfilePicModal.css";
import "./Signup.css";

function Signup() {
  // Redux
  const state = useSelector((state) => state.signupFeature);
  const dispatch = useDispatch();

  const step = state.step;

  // 사용자 정보를 관리하는 변수들
  const [email, setEmail] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [nickname, setNickname] = useState("");
  const [averageScore, setAverageScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [teeBox, setTeeBox] = useState("NONE");

  useEffect(() => {
    if (state.step == 5) {
      dispatch(setStateStep(4));
      dispatch(setEmail(state.email));
      dispatch(setNickname(state.nickname));
    } else {
      dispatch(setStateStep(1));
      dispatch(setStateEmail(""));
      dispatch(setStatePassword(""));
      dispatch(setStateNickname(""));
      dispatch(setStateProfile("green_suncap_tiger"));
      // dispatch(setStateTeeBox("flagall"));
      dispatch(setStateIsKakao(false));
    }
  }, []);

  useEffect(() => {
    setEmail(state.email);
  }, [state.step])

  // 닉네임 중복 검사
  const handleCheckNickname = () => {
    console.log("nickname: ", nickname); // Debug !!
    const data = {
      nickname: nickname,
    };
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/checkNickname";
    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("닉넴 체크 함, ", response);
        if (response.data.data.resultMessage === "FAIL") {
          console.log("닉네임이 중복되었습니다.");
          alert("이미 존재하는 닉네임입니다.");
        } else {
          console.log("유효한 닉네임입니다.");
          alert("사용 가능한 닉네임입니다.");
          dispatch(setStateNickname(nickname));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // 최고 타수 함수
  const handleTopScoreChange = (e) => {
    const newValue = e.target.value;

    // 최소값 0
    if (newValue.length == 0) {
      setTopScore(0);
    } else if (newValue.length >= 2 && newValue[0] === '0') {
      // newValue가 2자 이상이고 첫 글자가 0인 경우 0 제거
        const numericValue = parseInt(newValue, 10); // 숫자로 변환 (앞의 0 제거)
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
          setTopScore(numericValue);
        }
      } else {
        // 그 외의 경우 그대로 처리
        const numericValue = parseInt(newValue, 10);
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
          setTopScore(numericValue);
        }
      }
  }

  // 평균 타수 함수
  const handleAverageScoreChange = (e) => {
    const newValue = e.target.value;

    // 최소값 0
    if (newValue.length == 0) {
      setAverageScore(0);
    } else if (newValue.length >= 2 && newValue[0] === '0') {
      // newValue가 2자 이상이고 첫 글자가 0인 경우 0 제거
        const numericValue = parseInt(newValue, 10); // 숫자로 변환 (앞의 0 제거)
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
          setAverageScore(numericValue);
        }
      } else {
        // 그 외의 경우 그대로 처리
        const numericValue = parseInt(newValue, 10);
        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
          setAverageScore(numericValue);
        }
      }
  }

  // 사진 출력을 위한 변수
  const [imgPic, setImgPic] = useState("green_suncap_tiger");
  const [imgClr, setImgClr] = useState("white");

  // 사진 배경 색상을 map으로 관리
  const colorMap = {
    "red": "#F24141",
    "yellow": "#FFE000",
    "green": "#3BD641",
    "blue": "#80CAFF",
    "white": "#FFFFFF",
  }

  // 이미지 파일 경로를 객체로 관리 (미사용)
  const teeMap = {
    RED: flagred,
    WHITE: flagwhite,
    BLACK: flagblack,
    NONE: flagall,
  };

  // 모달 창 띄우고 내리는 변수 및 함수
  const [modalVisible, setModalVisible] = useState(false);
  const handleProfilePicModal = () => {
    setModalVisible(!modalVisible);
  }

  // 회원 가입 완료를 위한 함수들
  const navigate = useNavigate();
  const handleEmailFinish = () => {
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
      "id": state.email,
      "password": state.password,
      "nickname": nickname,
      "teeBox": teeBox,
      "topScore": topScore,
      "averageScore": averageScore,
      "level": level,
      "image": imgPic + " " + imgClr,
      "introduction": introduce,
      "isKakao": state.isKakao,
    };
    console.log("현재 가진 데이터?: ", data);
    console.log("isKakao: ", data.isKakao);
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/sign-up";

    axios
      .post(apiUrl, data)
      .then((response) => {
        // 회원가입 성공
        // alert 등으로 알린 뒤 화면 전환 필요
        alert("회원가입에 성공했습니다.");
        console.log(response); // 디버그
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error: ", error); // Debug Code !!!
        // navigate("/error");
      });

    console.log("data: ", data); // Debug Code !!!
  };

  return (
    <div id="Signup">

      <div className="user-container">
        <div className="user-func">
          <div className="user-func-title">회원가입</div>
          {step === 1 && <SignupChoice />}
          {step === 2 && <SignupEmail1 />}
          {step === 3 && <SignupEmail2 />}
          {step === 4 && (
            <div id="SignupInfo">
              <div className="user-func-context">
                자신을 소개하는 정보를 입력하세요
              </div>

              <input
                type="email"
                defaultValue={email}
                aria-readonly
                className="user-func-normal-input" />
              <div className="user-email-auth-block">
                <input
                  value={nickname}
                  placeholder="닉네임"
                  className="user-email-auth-input"
                  onChange={(e) => setNickname(e.target.value)} />
                <button className="user-email-auth-button gr"
                  onClick={handleCheckNickname}>
                  검사
                </button>
              </div>
              <input
                value={introduce}
                placeholder="자기소개"
                className="user-func-normal-input"
                onChange={(e) => setIntroduce(e.target.value)}
              />

              <div className="user-func-box">
                <div className="user-func-half">
                  <label className="user-func-label">최고 타수</label>
                  <input
                    type="text"
                    value={topScore}
                    className="user-func-half-input"
                    onChange={handleTopScoreChange} />
                </div>
                <div className="user-func-half">
                  <label className="user-func-label">평균 타수</label>
                  <input
                    type="number"
                    value={averageScore}
                    className="user-func-half-input"
                    onChange={handleAverageScoreChange} />
                </div>
              </div>

              <div className="user-func-radio">
                <div className="user-func-label">
                  선호 티 박스

                  <div className="tee-tooltip">
                    <AiOutlineInfoCircle className="tee-tooltip-icon" />
                    <span className="tee-tooltip-text">
                      레이디 티(레드 티): 여성이나 어린이를 위한 티 박스로 홀 과의 거리가 가장 짧은 티 박스입니다.<br />
                      레귤러 티(화이트 티): 일반 남성, 여성 상급자, 여성 프로, 청소년 선수 들을 위한 티 박스로 레드 티보다 홀 과의 거리가 멉니다.<br />
                      블랙 티: 몇몇 골프장은 블루 티보다 거리가 먼 블랙 티 박스가 있습니다. 상급자 남성, 프로 선수들이 플레이 합니다.<br />
                      출처: <a className="clickable" href="http://www.golifekorea.com" target="_blank">고라이프코리아</a>
                    </span>
                  </div>

                </div>
                <div className="user-func-radio-block" >
                  <img src={flagred} alt="레드 티 박스"
                    onClick={() => setTeeBox('RED')}
                    className={`option-tee-img${teeBox === 'RED' ? '-selected' : ''}`} />
                  <img src={flagwhite} alt="화이트 티 박스"
                    onClick={() => setTeeBox('WHITE')}
                    className={`option-tee-img${teeBox === 'WHITE' ? '-selected' : ''}`} />
                  <img src={flagblack} alt="블랙 티 박스"
                    onClick={() => setTeeBox('BLACK')}
                    className={`option-tee-img${teeBox === 'BLACK' ? '-selected' : ''}`} />
                  <img src={flagall} alt="모든 티 박스"
                    onClick={() => setTeeBox('NONE')}
                    className={`option-tee-img${teeBox === 'NONE' ? '-selected' : ''}`} />
                </div>
              </div>

            </div>
          )}
          {/* {step === 4 && <SignupInfo
            setStateIntroduce={setStateIntroduce}
            setStateAverageScore={setStateAverageScore}
            setStateTopScore={setStateTopScore}
            setStateTeeBox={setStateTeeBox}
          />} */}
        </div>
        {step === 4 ? (
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
