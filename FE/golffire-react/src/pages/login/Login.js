import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { setUserId, setUserNickname, setUserLevel, setUserTee } from "../../features/userInfoSlice";

import golfImage from "../../assets/source/icons/golf.png";
import BackgroundImgage from "../../assets/source/imgs/golf-image-1.png";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { IoMailOutline, IoChatbubbleSharp } from "react-icons/io5";

import "./Login.css";

const Login = () => {
  // Redux
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["refreshToken"]);
  const navigate = useNavigate();

  // 이메일 로그인 함수
  const handleEmailLogin = () => {
    if (email === "") {
      alert("이메일을 입력해 주세요.");
      return;
    }
    else if (password === "") {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    // 로그인 정보
    const data = {
      id: email,
      password: password,
      isKakao: false,
    };

    // 서버 API 엔드포인트 URL
    // 추후 실제 서버 URL로 대체 필요 !!
    const apiUrl = "http://localhost:8080/members/sign-in";

    // Axios를 사용하여 POST 요청 보내기
    axios
      .post(apiUrl, data)
      .then((response) => {
        // 서버로부터 받은 정보
        const access_token = response.data.data.token.accessToken;
        const refresh_token = response.data.data.token.refreshToken;

        // header에 accesstoken 저장
        axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        // 쿠키에 정보 저장
        setCookie("refreshToken", refresh_token, {
          path: "/",
          maxAge: new Date().getDate() + 60 * 60 * 24 * 14,
        });

        console.log(response.data); // Debug Code !!

        // NavBar에 사용자 정보 저장 - data for test
        dispatch(setUserId(email));
        dispatch(setUserNickname("로그인 됨"));
        dispatch(setUserLevel("eagle"));
        dispatch(setUserTee("Red"));

        // 로그인 성공 후 Main으로 복귀
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error); // Debug Code !!

        // 로그인 실패를 화면에 표시하는 코드 필요 !!
        navigate("/error");
      });
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 시도"); // Debug Code !!

    const REST_API_KEY = "cd0c9cf0cf49dae9a987aebb769ee0d6";
    const REDIRECT_URI = "http://localhost:3000/auth/kakao/login/callback";
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
            <img className="user-banner-img-style" src={BackgroundImgage} alt="golf-mascot-image" />
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

    </div>
  );
};

export default Login;
