import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import {
  setStateStep,
  setStateEmail,
  setStatePassword,
  setStateNickname,
  setStateIsKakao,
} from "../../features/signupSlice";

import { Box } from "@chakra-ui/react";

const Kakao = (props) => {
  // Redux
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");

  let params = new URL(document.URL).searchParams; // get query string
  let CODE = params.get("code");
  console.log("CODE: ", CODE); // Debug !!

  const data = {
    code: CODE,
  };
  const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/code";

  // KAKAO Token 발급
  const grant_type = "authorization_code";
  const client_id = "cd0c9cf0cf49dae9a987aebb769ee0d6"; // REST-API-TOKEN
  const REDIRECT_URI = process.env.REACT_APP_SERVER_URL + "/auth/kakao/signup/callback";
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
      console.error("Error:", error); // Debug Code
    });

  // KAKAO 회원 정보 가져오기
  const getInfo = (access_token) => {
    const apiUrl = "https://kapi.kakao.com/v2/user/me";

    // Axios를 사용하여 GET 요청 보내기
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log("kakao info ", response);
        console.log(response.data.kakao_account.email);
        const kakaoData = response.data.kakao_account;

        handleCheckEmail(kakaoData);
      })
      .catch((error) => {
        console.error("Error:", error); // Debug Code
      });

    const handleCheckEmail = (kakaoData) => {
      const data = {
        id: kakaoData.email,
      };
      const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/checkEmail";
      
      axios
        .post(apiUrl, data)
        .then((response) => {
          if (response.data.data.resultMessage === "FAIL") {
            console.log("이메일이 중복되었습니다.");
            alert("이미 가입된 이메일입니다.");
            navigate("/");
          } else {
            console.log("유효한 이메일입니다.");
            // Redux
            dispatch(setStateEmail(kakaoData.email));
            dispatch(setStateNickname(kakaoData.profile.nickname));
            dispatch(setStatePassword(1234)); // axios를 위한 test value
            dispatch(setStateIsKakao(true));
            dispatch(setStateStep(5));
            navigate("/signup");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  };

  useEffect(() => {
    console.log("Received props: ", props);
  });

  return (
    <Box>
      <Box maxW="md" mx="auto">
        <div>잠시만 기다려 주세요! 회원 가입 중입니다.</div>
      </Box>
    </Box>
  );
};

export default Kakao;
