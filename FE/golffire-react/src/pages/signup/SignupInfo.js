import { React, useEffect, useState } from "react";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setStateStep,
  setStateNickname,
} from "../../features/signupSlice";

import flagred from '../../assets/source/icons/flag-red.png';
import flagwhite from '../../assets/source/icons/flag-white.png';
import flagblack from '../../assets/source/icons/flag-black.png';
import flagall from '../../assets/source/icons/flag-all.png';

import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { setUserNickname } from "../../features/userInfoSlice";

const SignupInfo = ({ setStateIntroduce, setStateAverageScore, setStateTopScore, setStateTeeBox }) => {
  // Redux
  const dispatch = useDispatch();
  const state = useSelector((state) => state.signupFeature);

  // const { state } = useLocation();  const [password] = useState(state.password);
  const [introduce, setIntroduce] = useState("");
  const [email, setEmail] = useState(state.email);
  const [nickname, setNickname] = useState(state.nickname);
  const [averageScore, setAverageScore] = useState(state.averageScore);
  const [topScore, setTopScore] = useState(state.topScore);
  const [teeBox, setTeeBox] = useState(state.teeBox);

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
          dispatch(setStateNickname(nickname));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // 자기소개 함수
  const handleIntroduction = (e) => {
    const introduceText = e.target.value;
    setIntroduce(introduceText);
    setStateIntroduce(introduceText);
  }

  // 최고 타수 함수
  const handleTopScoreChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 144) {
      setTopScore(newValue);
      setStateTopScore(newValue);
    }
  }

  // 평균 타수 함수
  const handleAverageScoreChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 144) {
      setAverageScore(newValue);
      setStateAverageScore(newValue);
    }
  }

  // 티 박스 함수
  const handleTeeBox = (e) => {
    setStateTeeBox(teeBox);
    console.log("티박스 셀렉 됨", teeBox);
  }

  return (
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
        onChange={handleIntroduction}
      />

      <div className="user-func-box">
        <div className="user-func-half">
          <label className="user-func-label">최고 타수</label>
          <input
            type="number"
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
        <div className="user-func-radio-block"
          onChange={handleTeeBox}>
          <img src={flagred} alt="레드 티 박스"
            onClick={() => setTeeBox('flagred')}
            className={`option-tee-img${teeBox === 'flagred' ? '-selected' : ''}`} />
          <img src={flagwhite} alt="화이트 티 박스"
            onClick={() => setTeeBox('flagwhite')}
            className={`option-tee-img${teeBox === 'flagwhite' ? '-selected' : ''}`} />
          <img src={flagblack} alt="블랙 티 박스"
            onClick={() => setTeeBox('flagblack')}
            className={`option-tee-img${teeBox === 'flagblack' ? '-selected' : ''}`} />
          <img src={flagall} alt="모든 티 박스"
            onClick={() => setTeeBox('flagall')}
            className={`option-tee-img${teeBox === 'flagall' ? '-selected' : ''}`} />
        </div>
      </div>

    </div>
  );
};

export default SignupInfo;
