import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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
import golfImage from "../../assets/source/icons/golf.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 정보
    const data = {
      email: email,
      password: password,
    };

    // 서버 API 엔드포인트 URL
    // 추후 실제 서버 URL로 대체 필요
    const apiUrl = 'http://localhost:8080/members/sign-in';

    // Axios를 사용하여 POST 요청 보내기
    axios.post(apiUrl, data)
      .then((response) => {
        // 서버로부터 받은 정보
        const { grant_type, access_token, refresh_token } = response.data.token;

        // 쿠키에 정보 저장
        setCookie('user_email', data.email, { path: '/' });
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

  return (
    <div id='Login' style={{ height: "580px" }}>
      <div>
        {/* 그림 공간 */}
        <div id='banner-context'>
          <div id='banner-context'>
            <div id='banner-letter'>
              함께 골프 칠 동료를<br />
              온라인으로 찾아보세요!
            </div>
          </div>
          <div id='banner-image'>
            <img
              src={golfImage}
              alt="banner-golf-icon"
            />
          </div>
        </div>
      </div>


      {/* 기능 공간 */}
      <div id='login-func'>
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
              <Button variant="link">회원가입</Button>
            </Stack>
          </Box>
        </Box>

      </div>

    </div>
  );
};

export default Login;
