import { React, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  VStack
} from "@chakra-ui/react";
import {
  EmailIcon
} from "@chakra-ui/icons";

const SignupInfo = () => {
  const { state } = useLocation();

  const [image, setImage] = useState(state.image);
  const [email, setEmail] = useState(state.email);
  const [password] = useState(state.password);
  const [nickname, setNickname] = useState(state.nickname);
  const [introduce, setIntroduce] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  // 닉네임 중복 검사
  const handleCheckNickname = () => {
    console.log("nickname: ", nickname); // Debug !!
  }

  const navigate = useNavigate();

  const handleEmailFinish = () => {
    const data = {
      id: email,
      image: image,
      password: password,
      nickname: nickname,
      introduce: introduce,
      // averageScore: averageScore,
      // topScore: topScore,
      // level: level,
      // teeBox: teeBox,
      isKakao: false,
    }


    console.log("data: ", data);
    // navigate("/");
  }

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
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              bg={"white"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* 사용 가능 여부를 나타내는 안내 문구 필요! */}
          </FormControl>

          <FormControl maxW={"sm"}>
            <FormLabel>닉네임</FormLabel>
            <Input
              bg={"white"}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {/* 사용 가능 여부를 나타내는 안내 문구 필요! */}
          </FormControl>
          <Button
            onClick={handleCheckNickname}
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
            검사
          </Button>

          <FormControl maxW={"sm"}>
            <FormLabel>자기소개</FormLabel>
            <Input
              placeholder="자기소개를 입력하세요."
              bg={"white"}
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
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
