import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
  } from '@chakra-ui/react';
import axios from 'axios';


const Kakao = (props) => {
    const navigate = useNavigate();
    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let CODE = params.get("code");
    console.log(CODE);

    // KAKAO Token 발급
    const grant_type = 'authorization_code'
        const client_id = 'cd0c9cf0cf49dae9a987aebb769ee0d6' // REST-API-TOKEN
        const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback'
        axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${CODE}`,
          {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        ).then((response) => {
            console.log('token: ',response);
            const access_token = response.data.access_token;
            const expires_in = response.data.expires_in;
            const refresh_token = response.data.refresh_token;
            const refresh_token_expires_in = response.data.refresh_token_expires_in;
            getInfo(access_token);
        })
          .catch((error) => {
            console.error('Error:', error); // Debug Code
          });
    
    // KAKAO 회원 정보 가져오기 
    const getInfo=(access_token)=>{
        const apiUrl = 'https://kapi.kakao.com/v2/user/me';
   
    
    // Axios를 사용하여 GET 요청 보내기
    axios.get(apiUrl, {headers:{
       Authorization: `Bearer ${access_token}`,
    }},
    )
        .then((response) => {
        console.log('kakao info', response);
        const email = response.data.kakao_account.email;
        const image = response.data.kakao_account.profile.profile_image_url;
        const nickname = response.data.kakao_account.profile.nickname;
        // sign-up 페이지로 회원정보를 가지고 돌아가기
   
        navigate('/signup', {
            state:{
                email: email,
                image: image,
                nickname: nickname
            }
        });

        
    })
        .catch((error) => {
         console.error('Error:', error); // Debug Code
    });
    }
    useEffect(() => {
        
    });
    
    

    return (
    
        <Box>
            <Box maxW="md" mx="auto">
                <div>잠시만 기다려 주세요! 로그인 중입니다.</div>
            </Box>
        </Box> 
    )

}

export default Kakao;