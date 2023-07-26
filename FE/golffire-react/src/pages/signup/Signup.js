import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ChakraProvider } from '@chakra-ui/react'
//  form 관련 코드 import
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Radio,
  RadioGroup,
  Input,
  Textarea,
  Text,

} from '@chakra-ui/react'

// 타수값 조정하는 코드 import
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [averageScore, setAverageScore] = useState('');
  const [topScore, setTopScore] = useState('');
  const [teeBox, setTeeBox] = useState('');
  const [image, setIamge] = useState('');
  const navigate = useNavigate();

  // Kakao Login API
  const{Kakao} = window
  const JAVASCRIPT_KEY = '2bb56ba41adc04c82f870dd73fcdd85d'
 
  const location = useLocation();
  if(location.state !== null){
    console.log('Kakao.js에서 가져온 값:',location.state)
    // get kakao info
    // email = location.state.email;
    // nickname = location.state.nickname;
    // image = location.state.image;

  }
  
  console.log('kakao info: ',email, nickname, image);

  const handleSignup=()=>{
    const data={
      memberId: email,
      password: password,
      nickname: nickname,
      introduction: introduction,
      averageScore: 88,
      topScore: 75,
      teeBox: "RED",
      level: "보기 플레이어",
      image: "media.jpg"
    }
    const apiUrl = 'http://localhost:8080/members/sign-up';
    axios.post(apiUrl, data)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error); // Debug Code
      });
  }

  // KaKao Login
const initKakao = () => {
  if (Kakao && !Kakao.isInitialized()) {
    Kakao.init(`${JAVASCRIPT_KEY}`)
  }
}

useState(() =>{
  initKakao()
}, [])

const kakaoLoginHandler = () => {
  Kakao.Auth.authorize({
    redirectUri: "http://localhost:3000/auth/kakao/callback",
  })
}


  return (
    <FormControl>
      <h1>정보 입력</h1>
      <h3>자신을 소개하는 정보를 입력하세요</h3>
      {/* 사진 넣는 공간 */}
      <FormLabel>닉네임</FormLabel>
      <Input 
        type='nickname'
        placeholder='닉네임을 입력하세요.'
        value={nickname}
        onChange={(e)=>setNickname(e.target.value)}/>
      {/* 자기소개 */}
      <FormLabel>자기소개</FormLabel>
      <Text mb='8px'>자기소개: </Text>
      <Textarea
        type='introduction'
        placeholder='본인을 소개하세요'
        size='sm'
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
      />
      <Input 
        type='email'
        placeholder='이메일을 입력해주세요'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <Input 
        type='password'
        placeholder='비밀번호를 입력해주세요'
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      {/* 타수 정보 입력 */}
      <FormLabel>평균타수</FormLabel>
      <NumberInput min={0} max={144} step={1} width={'auto'} type='averageScore' value={averageScore} onChange={(e)=> setAverageScore(e.target.value)}>
        <NumberInputField />
        <NumberInputStepper >
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Input type='bestshot' />
      <FormLabel>최고타수</FormLabel>
      <NumberInput  min={0} max={144} step={1} type='topScore' value={topScore} onChange={(e)=> setTopScore(e.target.value)}>
        <NumberInputField />
        <NumberInputStepper >
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Input type='avgshot' />
      {/* 선호 티박스 정보 입력 */}
      <FormLabel as='teebox'>선호 티박스</FormLabel>
      <RadioGroup defaultValue='Redtee'>
        <HStack spacing='24px'>
          <Radio value='Redtee'>레드티박스 - 여성</Radio>
          <Radio value='Whitetee'>화이트티박스 - 남성</Radio>
          <Radio value='Blacktee'>블랙티박스 - 프로</Radio>
        </HStack>
      </RadioGroup>
      <FormHelperText>프로라면 블랙티박스를 선택하세요.</FormHelperText>
      <Button colorScheme="blue" onClick={handleSignup}>회원가입</Button>
      <Button colorScheme="blue" onClick={kakaoLoginHandler}>카카오로 회원가입</Button>
    </FormControl>
  );
};

export default Signup;
