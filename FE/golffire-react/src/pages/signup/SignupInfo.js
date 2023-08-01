import { React, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setStateStep } from "../../features/signupSlice";

import { Button, FormControl, FormLabel, Input, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import axios from "axios";

const SignupInfo = () => {
  // Redux
  const dispatch = useDispatch();
  const state = useSelector((state) => state.signupFeature);
  // const { state } = useLocation();
  const [image, setImage] = useState("../../assets/source/icons/no-image.png");
  const [password] = useState(state.password);
  const [introduce, setIntroduce] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState(state.email);
  const [nickname, setNickname] = useState(state.nickname);
  const [averageScore, setAverageScore] = useState(state.averageScore);
  const [topScore, setTopScore] = useState(state.topScore);
  const [teeBox, setTeeBox] = useState(state.teeBox);
  const [isKakao, setIsKakao] = useState(state.isKakao);
  const handleOptionChange = (value) => {
    console.log("value", value);
    onchange = (e) => setTeeBox(e.target.value);
    console.log("selectedOption", teeBox);
  };

  // 닉네임 중복 검사
  const handleCheckNickname = () => {
    console.log("nickname: ", nickname); // Debug !!
    const data = {
      nickname: nickname,
    };
    const apiUrl = "http://localhost:8080/members/checkNickname";
    axios
      .post(apiUrl, data)
      .then((response) => {
        if (response.data.data.resultMessage === "FAIL") {
          console.log("닉네임이 중복되었습니다.");
          alert("이미 존재하는 닉네임입니다.");
        } else {
          console.log("유효한 닉네임입니다.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const navigate = useNavigate();

  const handleEmailFinish = () => {
    var referrer = document.referrer;

    console.log("이전 페이지 URL: " + referrer);
    setIsKakao(isKakao);
    console.log(isKakao);
    let level = "";
    if (averageScore <= 60) {
      level = "이글 플레이어";
    } else if (averageScore <= 70) {
      level = "버디 플레이어";
    } else if (averageScore <= 80) {
      level = "파 플레이어";
    } else if (averageScore <= 90) {
      level = "보기 플레이어";
    } else {
      level = "더블 플레이어";
    }
    const data = {
      id: email,
      image: image,
      password: password,
      nickname: nickname,
      introduction: introduce,
      averageScore: averageScore,
      topScore: topScore,
      level: level,
      teeBox: teeBox,
      isKakao: isKakao,
    };
    console.log("isKakao: ", isKakao);
    const apiUrl = "http://localhost:8080/members/sign-up";
    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log(response);
        console.log(response.data.data.id);
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    console.log("data: ", data);
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
            <Input bg={"white"} value={nickname} onChange={(e) => setNickname(e.target.value)} />
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
            <Input
              placeholder="0"
              bg={"white"}
              value={topScore}
              onChange={(e) => setTopScore(e.target.value)}
            />
            <FormLabel>평균타수</FormLabel>
            <Input
              placeholder="0"
              bg={"white"}
              value={averageScore}
              onChange={(e) => setAverageScore(e.target.value)}
            />
          </FormControl>

          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <VStack spacing={4}>
              <Radio value="RED">레드티박스 - 여성</Radio>
              <Radio value="WHITE">화이트티박스 - 남성</Radio>
              <Radio value="BLACK">블랙티박스 - 프로</Radio>
              <Radio value="NONE">상관없음 - 비공개</Radio>
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
