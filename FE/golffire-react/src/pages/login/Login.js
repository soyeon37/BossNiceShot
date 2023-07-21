import React, { useState } from "react";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import "./Login.css";
import golfImage from "../../assets/source/icons/golf.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 정보
    const data = {
      email: email,
      password: password,
    };

    // 서버 API 엔드포인트 URL
    // 추후 실제 서버 URL로 대체 필요
    const apiUrl = "http://localhost:8080/members/sign-in";

    // Axios를 사용하여 POST 요청 보내기
    axios
      .post(apiUrl, data)
      .then((response) => {
        // 서버로부터 받은 정보
        const { grant_type, access_token, refresh_token } = response.data.token;

        // 쿠키에 정보 저장
        setCookie("user_email", data.email, { path: "/" });
        setCookie("access_token", access_token, { path: "/" });
        setCookie("refresh_token", refresh_token, { path: "/" });

        // 로그인 성공 후 Main으로 복귀
        navigate("/");

        // console.log(response.data); // Debug Code
      })
      .catch((error) => {
        // 로그인 실패를 화면에 표시하는 코드 필요!

        console.error("Error:", error); // Debug Code
      });
  };

  return (
    <div id="Login">
      <div id="login-banner">
        {/* 그림 공간 */}
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
        {/*   <Input placeholder='default placeholder' /> */}

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
            비밀번호 찾기
            <br />
            <NavLink to="/signup" style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
              };
            }}>회원가입 하기</NavLink>

          </div>

        </div>
      </div>
    </div >
  );
};

export default Login;
