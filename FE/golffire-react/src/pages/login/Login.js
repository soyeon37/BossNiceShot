import React, { useState } from "react";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Style
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import "./Login.css";
import golfImage from "../../assets/source/icons/golf.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setCookie] = useCookies(["refreshToken"]);
  const navigate = useNavigate();

  // 이메일 로그인 함수
  const handleEmailLogin = () => {
    // 로그인 정보
    const data = {
      id: email,
      password: password,
      isKakao: false
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
        setCookie('refreshToken', refresh_token, { path: '/' , maxAge: new Date().getDate() + 60 * 60 * 24 *14 });


        console.log(response.data); // Debug Code !!

        // 로그인 성공 후 Main으로 복귀
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error); // Debug Code !!

        // 로그인 실패를 화면에 표시하는 코드 필요 !!
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

      {/* 그림 공간 */}
      <div id="login-banner">
        <div id="login-banner-context">
          <div id="banner-letter">
            동료들이 당신을
            <br />
            기다리고 있어요!
          </div>
        </div>
        <div id="login-banner-image">
          <img src={golfImage} alt="banner-golf-icon" />
        </div>
      </div>

      {/* 기능 공간 */}
      <div id="login-func">
        <div id="login-box">
          <div id="box-title">
            로그인
          </div>
          <div id="box-content">
            <FormControl maxW={'sm'}>
              <FormLabel>이메일</FormLabel>
              <Input
                type="email"
                placeholder="이메일을 입력하세요."
                bg={"white"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl maxW={'sm'} paddingTop={'2%'}>
              <FormLabel>비밀번호</FormLabel>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요."
                bg={"white"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </div>
          <div id="box-button">
            <Button
              onClick={handleEmailLogin}
              style={{
                height: "2.5rem",
                width: "100%",

                color: "black",
                borderRadius: "30px",
                background: "#B8F500",
              }}
              maxW={'sm'}
              marginBottom={'2.5rem'}
            > 로그인</Button>

            <Button
              onClick={handleKakaoLogin}
              style={{
                height: "2.5rem",
                width: "100%",

                color: "black",
                borderRadius: "30px",
                background: "#FFF500",
              }}
              maxW={'sm'}
              marginBottom={'2.5rem'}
            > 카카오톡으로 로그인하기</Button>

          </div>
          <div id="box-footer">
            <NavLink to="/findpassword" >비밀번호 찾기</NavLink>
            <br />
            <NavLink to="/signup">회원가입 하기</NavLink>
          </div>
        </div>
      </div>

    </div >
  );
};

export default Login;
