import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 정보
    const data = {
      memberId: email,
      password: password,
    };

    // 서버 API 엔드포인트 URL
    // 추후 실제 서버 URL로 대체 필요
    const apiUrl = 'http://localhost:8080/members/sign-in';

    // Axios를 사용하여 POST 요청 보내기
    axios.post(apiUrl, data)
      .then((response) => {
        // 서버로부터 받은 정보
        // const {access_token, refresh_token } = response.data.token;
        const access_token = response.data.data.token.accessToken;
        const refresh_token = response.data.data.token.refreshToken;

        // header에 accesstoken 저장
        axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        // 쿠키에 정보 저장
        setCookie('user_email', data.memberId, { path: '/' });
        setCookie('access_token', access_token, { path: '/' });
        setCookie('refresh_token', refresh_token, { path: '/' });

        // 로그인 성공 후 Main으로 복귀
        navigate('/');

        // console.log(response.data); // Debug Code
      })
      .catch((error) => {
        // 로그인 실패를 화면에 표시하는 코드 필요!

        console.error('Error:', error); // Debug Code
      });
  };


  const testPut = () => {
    const data = {
      password: "1234",
      nickname: "함싸피",
      teeBox: "RED",
      topScore: 72,
      averageScore: 88,
      level: "보기 플레이어",
      image: "apple.jpg",
      introduction: "방가방가"
    }
    const apiUrl = 'http://localhost:8080/members/update';
    console.log(cookies.access_token);
    axios.put(apiUrl, data, {
      headers: {'Authorization': 'Bearer '+ cookies.access_token}
    })
      .then((response) => {
        
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Error:', error); // Debug Code
      });
  }

  return (
    <Box p={4}>
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" mb={6}>로그인</Heading>
        <FormControl>
          <FormLabel>Email 주소</FormLabel>
          <Input
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack mt={6} direction="row" justifyContent="center">
          <Button colorScheme="blue" onClick={handleLogin}>로그인</Button>
          <Button variant="link" onClick={testPut}>회원가입</Button>
        </Stack>
      </Box>


    </Box>
  );
};

export default Login;
