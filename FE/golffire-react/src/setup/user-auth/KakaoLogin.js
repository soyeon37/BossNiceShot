import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { setUserId, setUserNickname, setUserLevel, setUserTee, setUserImage, setUserAccessToken, resetUserState } from "../../features/userInfoSlice";
import Interceptor from "./Interceptor";

import { Box, Code } from "@chakra-ui/react";

const Kakao = (props) => {
  // Redux
  const dispatch = useDispatch();

  const [checkToken, setCheckToken] = useState(0);
  const [doLogin, setDoLogin] = useState(0);
  const [doLogout, setDoLogout] = useState(0);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [cookies, setCookie] = useCookies(["refreshToken"]);

  let params = new URL(document.URL).searchParams; // get query string
  let CODE = params.get("code");
  console.log("CODE: ", CODE); // Debug !!

  // KAKAO Token 발급
  const grant_type = "authorization_code";
  const client_id = "cd0c9cf0cf49dae9a987aebb769ee0d6"; // REST-API-TOKEN
  const REDIRECT_URI = process.env.REACT_APP_SERVER_URL + "/auth/kakao/login/callback";
  axios
    .post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${CODE}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
    .then((response) => {
      console.log("token: ", response);
      // accessToken & refreshToken & 만료시간 모두 WAS로 전송
      const access_token = response.data.access_token;
      const expires_in = response.data.expires_in;
      const refresh_token = response.data.refresh_token;
      const refresh_token_expires_in = response.data.refresh_token_expires_in;
      getInfo(access_token);
    })
    .catch((error) => {
      console.error('Error:', error); // Debug Code
    });

  // KAKAO 회원 정보 가져오기 
  const getInfo = (access_token) => {
    const apiUrl = 'https://kapi.kakao.com/v2/user/me';

    // Axios를 사용하여 GET 요청 보내기
    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
      .then((response) => {
        console.log("kakao info ", response);
        console.log(response.data.kakao_account.email);
        const email = response.data.kakao_account.email;

        handleCheckEmail(email);
      })
      .catch((error) => {
        console.error("Error:", error); // Debug Code
      });

    const handleCheckEmail = (email) => {
      const data = {
        id: email
      }
      const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/checkEmail";
      console.log(email);
      axios
        .post(apiUrl, data)
        .then((response) => {
          if (response.data.data.resultMessage === "SUCCESS") {
            console.log("회원가입이 되어있지 않습니다.");
            alert("회원가입이 되어있지 않습니다.");
            navigate("/Signup");
          } else {
            console.log("유효한 이메일입니다.");
            // 카카로 로그인 하기
            handleKaKaoEmailLogin(email);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    // 로그인
    const handleKaKaoEmailLogin = (email) => {
      console.log(email);
      // 로그인 정보
      const data = {
        id: email,
        password: "1234",
        isKakao: true,
      };
      setDoLogin(data);
      
      //
      // const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/sign-in"
      // console.log("kakao login 시도중:", data);
      // axios
      //   .post(apiUrl, data)
      //   .then((response) => {
      //     // 사용자 정보를 작성하는 코드
      //     const responsedData = response.data.data;

      //     // accessToken은 헤더로 설정
      //     const access_token = responsedData.token.accessToken;
      //     const refresh_token = responsedData.token.refreshToken;
      //     // axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      //     setCookie("refreshToken", refresh_token, {
      //       path: "/",
      //       maxAge: new Date().getDate() + 60 * 60 * 24 * 14,
      //     });

      //     // NavBar에 사용자 정보 저장 - data for test

      //     navigate("/");
      //   })
      //   .catch((error) => {
      //     console.error("Error: ", error);
      //     navigate("/error");
      //   });
    };
  };

  useEffect(() => {
    console.log("Received props: ", props);
  });

  return (
    <Box>
      <Box maxW="md" mx="auto">
        <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
      </Box>

      <Interceptor
        checkToken={checkToken}
        doLogin={doLogin}
        doLogout={doLogout}
      />

    </Box>
  );
};

export default Kakao;
