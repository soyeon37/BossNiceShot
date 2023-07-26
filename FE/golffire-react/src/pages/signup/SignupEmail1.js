import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const SignupEmail1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleEmailVerify = () => {
    navigate("/Signup/email2");
  };

  return (
    <div id="Signup">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button
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
            onClick={handleEmailVerify}
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
