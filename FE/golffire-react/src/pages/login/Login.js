import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Interceptor from "../../setup/user-auth/Interceptor";

import BackgroundImage from "../../assets/source/imgs/golf-image-1.svg";
import { IoMailOutline, IoChatbubbleSharp } from "react-icons/io5";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checkToken, setCheckToken] = useState(0);
  const [doLogin, setDoLogin] = useState(0);
  const [doLogout, setDoLogout] = useState(0);

  // 이메일 로그인 함수
  const handleEmailLogin = () => {
    if (email === "") {
      alert("이메일을 입력해 주세요.");
      return;
    } else if (password === "") {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    // 로그인 정보
    const data = {
      id: email,
      password: password,
      isKakao: false,
    };

    // 로그인 정보로 Interceptor의 로그인 함수 실행
    setDoLogin(data);
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 시도"); // Debug Code !!

    const REST_API_KEY = "cd0c9cf0cf49dae9a987aebb769ee0d6";
    const REDIRECT_URI = process.env.REACT_APP_SERVER_URL + "/auth/kakao/login/callback";
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoUrl;
  };

  return (
    <div id="Login">

      <div className="user-container">
        <div className="user-banner">
          <div className="user-banner-title">
            동료들이<br />기다리고 있어요!
          </div>
          <div className="user-banner-img">
            <img className="user-banner-img-style" src={BackgroundImage} alt="golf-mascot-image" />
          </div>
        </div>
        <div className="user-func">
          <div className="user-func-title">
            로그인
          </div>
          <input
            className="user-func-normal-input"
            type="email"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="user-func-normal-input"
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEmailLogin();
              }
            }}
          />
          <button
            className="user-func-email-login"
            onClick={handleEmailLogin} >
            <IoMailOutline className="button-react-icon" />
            <div className="user-button-text">로그인하기</div>
          </button>
          <button
            className="user-func-kakao-login"
            onClick={handleKakaoLogin} >
            <IoChatbubbleSharp className="button-react-icon" />
            <div className="user-button-text">카카오톡으로 로그인</div>
          </button>
          <hr className="user-hr" />
          <div className="user-func-footer">
            <NavLink to="/findpassword">
              <div className="user-func-footer-half">비밀번호 찾기</div>
            </NavLink>
            <NavLink to="/signup">
              <div className="user-func-footer-half">회원가입하기</div>
            </NavLink>
          </div>
        </div>

        {/* 배경 및 모양 관련 div */}
        <div className="user-container-bump"></div>
      </div>
      <div className="user-container-shadow">
        <div className="user-container-shadow-bump"></div>
      </div>

      <Interceptor
        checkToken={checkToken}
        doLogin={doLogin}
        doLogout={doLogout}
      />
      
    </div>
  );
};

export default Login;
