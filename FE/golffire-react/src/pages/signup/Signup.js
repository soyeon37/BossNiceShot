import React from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
} from "@chakra-ui/react";
import "./Signup.css";

function Signup() {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:3000/auth/kakao/signup/callback'
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const handleKakaoSignup = () => {
    // console.log("카카오 로그인"); // Debug !!
    window.location.href = kakaoUrl;
  }

  return (
    <div id="Signup">
      <div className="title">
        <h1>
          회원가입
        </h1>
      </div>
      <div>
        <NavLink to="/signup/email1" >
          <Button
            style={{
              height: "2.5rem",
              width: "100%",

              color: "black",
              borderRadius: "30px",
              background: "#FFFFFF",
            }}
            maxW={'sm'}
            marginBottom={'2.5rem'}
          > 이메일로 가입하기</Button>
        </NavLink>
      </div>
      <div>
        <Button
          onClick={handleKakaoSignup}
          style={{
            height: "2.5rem",
            width: "100%",

            color: "black",
            borderRadius: "30px",
            background: "#FFF500",
          }}
          maxW={'sm'}
          marginBottom={'2.5rem'}
        > 카카오톡으로 가입하기</Button>
      </div>
      <hr />
      <NavLink to="/login" style={({ isActive, isPending }) => {
        return {
          fontWeight: isActive ? "bold" : "",
        };
      }}>로그인하기</NavLink>
    </div>
  );
}

export default Signup;
