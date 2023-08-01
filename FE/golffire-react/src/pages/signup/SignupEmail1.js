import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setStateStep, setStateEmail } from "../../features/signupSlice";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";

const SignupEmail1 = () => {
  // Redux
  const dispatch = useDispatch();
  const stateEmail = useSelector((state) => state.signupFeature.email);

  // 이메일 및 인증번호
  const [email, setEmail] = useState("");
  const [userNum, setUserNum] = useState(""); // 사용자 입력 인증번호
  const [verifyNum, setVerifyNum] = useState("TEST"); // 서버로부터 받은 인증번호
  const [verified, setVerified] = useState(false);

  // 이메일 가입 여부 확인 함수
  const handleCheckEmail = () => {
    const data = {
      id: email,
    };
    const apiUrl = "http://localhost:8080/members/checkEmail";

    axios
      .post(apiUrl, data)
      .then((response) => {
        if (response.data.data.resultMessage === "FAIL") {
          console.log("이메일이 중복되었습니다.");
          alert("이미 존재하는 이메일입니다.");
        } else {
          console.log("유효한 이메일입니다.");
          handleSendEmail(email);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // 유효 이메일로 인증번호 송신하는 함수
  const handleSendEmail = (email) => {
    const data = {
      id: email,
    };
    const apiUrl = "http://localhost:8080/members/sendEmailVerification";

    axios
      .post(apiUrl, data)
      .then((response) => {
        setVerifyNum(response.data.data.authNum); // 인증번호
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEmailVerify = () => {
    if (userNum === verifyNum) {
      setVerified(true);
      alert("인증이 완료되었습니다.");
      dispatch(setStateEmail(email));
    } else {
      alert("인증번호를 다시 확인해 주세요.");
    }
  };

  // '다음으로'
  const handleEmailNext = () => {
    if (verified) {
      dispatch(setStateStep(3));
      // navigate("/signup/email2", { state: { email: email } });
    } else {
      alert("이메일 인증을 먼저 마쳐주세요!");
    }

    // Debug Code !!!
    console.log("email: ", email);
    console.log("userNum: ", userNum);
    console.log("verifyNum: ", verifyNum);
    console.log("verified: ", verified);
  };

  return (
    <div id="SignupEmail1">
      <div id="email1">
        <div className="title">
          <h1>
            회원가입
            <br />
            이메일을 인증하세요
          </h1>
        </div>
        <div className="signup-email-check">
          <FormControl maxW={"sm"}>
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              placeholder="이메일을 입력하세요."
              bg={"white"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button
            onClick={handleCheckEmail}
            style={{
              height: "2.5rem",
              width: "100%",

              color: "black",
              borderRadius: "30px",
              background: "#B8F500",
            }}
            maxW={"sm"}
            marginBottom={"2.5rem"}
          >
            인증번호 전송하기
          </Button>
        </div>
        <div>
          <FormControl maxW={"sm"}>
            <FormLabel>인증번호</FormLabel>
            <Input
              type="email"
              placeholder="인증번호를 입력하세요."
              bg={"white"}
              value={userNum}
              onChange={(e) => setUserNum(e.target.value)}
            />
          </FormControl>
          <Button
            onClick={handleEmailVerify}
            style={{
              height: "2.5rem",
              width: "100%",

              color: "black",
              borderRadius: "30px",
              background: "#B8F500",
            }}
            maxW={"sm"}
            marginBottom={"2.5rem"}
          >
            인증하기
          </Button>
          <Button
            onClick={handleEmailNext}
            style={{
              height: "2.5rem",
              width: "100%",

              color: "black",
              borderRadius: "30px",
              background: "#FFFFFF",
            }}
            maxW={"sm"}
            marginBottom={"2.5rem"}
          >
            다음으로
          </Button>
        </div>
        <hr />
        <NavLink to="/signup">돌아가기</NavLink>
      </div>
    </div>
  );
};

export default SignupEmail1;
