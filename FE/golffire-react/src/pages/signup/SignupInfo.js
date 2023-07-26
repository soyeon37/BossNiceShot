import { React, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

const SignupInfo = () => {
  const { state } = useLocation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState(state.email);
  const [nickname, setNickname] = useState(state.nickname);
  const [image, setImage] = useState(state.image);
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const navigate = useNavigate();
  const handleEmailFinish = () => {
    console.log(email);
    
    // const data = {
    //   id: email,
    //   password: password,
    //   nickname: nickname,
    //   information: information,
    //   averageScore: averageScore,
    //   topScore: topScore,
    //   level: level,
    //   teeBox: teeBox,
    //   image: image,
    //   isKakao: false,
    // }
    // navigate("/");
  };

  return (
    <div id="Signup">
      <div className="signup-info">
        <div className="signup-title">
          <h1>
            정보 입력
            <br />
            자신을 소개하는 정보를 입력하세요.
          </h1>
        </div>
        <div className="signup-pic">(사진 공간)</div>
        <div className="signup-info-body">
          <FormControl maxW={"sm"}>
            <FormLabel>닉네임</FormLabel>
            <Input placeholder="닉네임을 입력하세요." bg={"white"} />
            {/* 사용 가능 여부를 나타내는 안내 문구 필요! */}
          </FormControl>

          <FormControl maxW={"sm"}>
            <FormLabel>자기소개</FormLabel>
            <Input placeholder="자기소개를 입력하세요." bg={"white"} />
            {/* 입력 제한 안내 문구 필요! */}
          </FormControl>

          <FormControl maxW={"sm"}>
            <FormLabel>최고타수</FormLabel>
            <Input placeholder="0" bg={"white"} />
            <FormLabel>평균타수</FormLabel>
            <Input placeholder="0" bg={"white"} />
          </FormControl>

          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <VStack spacing={4}>
              <Radio value="option1">레드티박스 - 여성</Radio>
              <Radio value="option2">화이트티박스 - 남성</Radio>
              <Radio value="option3">블랙티박스 - 프로</Radio>
            </VStack>
          </RadioGroup>
        </div>
        <Button
          onClick={handleEmailFinish}
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
          회원가입 완료하기
        </Button>
      </div>
    </div>
  );
};

export default SignupInfo;
