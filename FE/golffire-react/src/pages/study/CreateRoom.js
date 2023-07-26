import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Switch,
  NumberInput,
  NumberInputField,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import "./study.css";

function CreateRoom() {

  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  const handleGoBack = () => {
    window.history.back();
  };
  

  const handleRegisterClick = () => {
    if (value.trim() === '') {
        // 내용이 비어있을 경우 Alert를 표시합니다.
        setShowAlert(true);
    } else {
        // 등록 또는 제출 로직을 여기에 작성합니다.
        // 예를 들어, 서버로 데이터를 전송하거나 원하는 다른 작업을 수행할 수 있습니다.
        console.log("Content submitted:", value);
        navigate('/studylist');
    }
};


  return (
    <Box className="Create-Room-Container" p={8}>
      <Heading mb={4} fontSize="2xl">새로운 방 만들기</Heading>
      <Flex direction={{ base: "column", md: "row" }} justify="center">
        <Box flexBasis={{ base: "100%", md: "50%" }} pr={{ md: 2 }}>
          <Box mb={4}>
            <p style={{ fontSize: "24px", textAlign: "left" }}>방 제목</p>
            <Input placeholder="방 제목을 입력하세요" />
          </Box>
          <Box>
            <p style={{ fontSize: "24px", textAlign: "left" }}>방 소개</p>
            <Input placeholder="방 소개를 입력하세요" />
          </Box>
        </Box>
        <Box flexBasis={{ base: "100%", md: "50%" }} pl={{ md: 2 }}>
          <p style={{ fontSize: "24px", textAlign: "left" }}>방 속성</p>
          <Flex alignItems="center">
            <p style={{ fontSize: "16px", textAlign: "left", marginRight: "10px" }}>코칭/러닝</p>
            <RadioGroup>
              <Radio value="option1">코칭</Radio>
              <Radio value="option2">러닝</Radio>
            </RadioGroup>
          </Flex>          
          <Flex alignItems="center" mb={4}>
            <p style={{ fontSize: "16px", textAlign: "left", marginRight: "10px" }}>비밀방 설정</p>
            <Switch />
          </Flex>
          <Flex alignItems="center" mb={4}>
            <p style={{ fontSize: "16px", textAlign: "left", marginRight: "10px" }}>비밀번호 설정</p>
            <NumberInput>
              <NumberInputField placeholder="4자이상 입력" fontSize="5px"/>
            </NumberInput>
          </Flex>
          <Flex alignItems="center">
            <p style={{ fontSize: "16px", textAlign: "left", marginRight: "10px" }}>최대 인원 설정</p>
            <NumberInput>
              <NumberInputField placeholder="2 ~ 20명까지 설정" fontSize="5px"/>
            </NumberInput>
          </Flex>
        </Box>
      </Flex>
      <Button width='8rem' margin={5} onClick={handleGoBack}>취소</Button>
      <Button width='8rem' margin={5} onClick={handleRegisterClick}>등록하기</Button>
      {showAlert && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle> 내용을 입력해주세요.</AlertTitle>
        </Alert>
      )}
    </Box>
  );
}

export default CreateRoom;