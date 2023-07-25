import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const SignupEmail2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleEmailSetPassword = () => {
    navigate("/Signup/info");
  };

  return (
    <div id="Signup">
      <div id="email2">
        <div className="title">
          <h1>
            회원가입
            <br />
            정보를 입력하세요
          </h1>
        </div>
        <div className="email-login-info">
          <FormControl maxW={"sm"}>
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              placeholder="이메일을 입력하세요."
              bg={"white"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>비밀번호 입력</FormLabel>
            <Input type="password" placeholder="비밀번호를 입력하세요." bg={"white"} />
            <FormLabel>비밀번호 확인</FormLabel>
            <Input type="password" placeholder="비밀번호를 다시 한 번 입력하세요." bg={"white"} />
            {/*
                비밀번호 조건 명시
                조건 미충족 시 진행 불가 코드 필요!
            */}
          </FormControl>
        </div>
        <div>
          {/* 개인정보 이용 약관 안내 및 동의 radio button 필요! */}
          <Button
            onClick={handleEmailSetPassword}
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
            다음으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupEmail2;
