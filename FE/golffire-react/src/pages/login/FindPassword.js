import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

function FindPassword() {
  const [email, setEmail] = useState("");

  const handleFindPassword = () => {
    alert("준비중입니다."); // Debug Code

    // 3가지 답변
    // 1. 가입 정보 없다면 -> alert로 없다고 알림
    // 2. 이메일 가입자라면 -> 이메일로 비밀번호 전송 후 alert
    // 3. 카카오톡 가입자라면 -> alert로 카카오톡 가입자라고 알림
  };

  return (
    <div id="FindPassword">
      <div id="email1">
        <div className="title">
          <h1>
            비밀번호 찾기
            <br />
            가입한 이메일을 입력하세요
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
            onClick={handleFindPassword}
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
            가입 정보 확인하기
          </Button>
        </div>
        <hr />
        <NavLink to="/signup">돌아가기</NavLink>
      </div>
    </div>
  );
}

export default FindPassword;
