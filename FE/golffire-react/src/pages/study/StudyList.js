import React, { useState } from "react";

import {
  ChakraProvider,
  Flex,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";

import "./studylist.css"

function Learning() {
  const [coachingActive, setCoachingActive] = useState(true);
  const [searchText, setSearchText] = useState('');

  const handleCoachingClick = () => {
    setCoachingActive(true);
  };

  const handleRunningClick = () => {
    setCoachingActive(false);
  };

  return (
    <ChakraProvider>
      <div id="Learning">
        <h1>코칭 / 러닝</h1>
        <h2>
          희망하는 코칭/러닝 방에 입장하세요.<br />
          새로운 방을 만들어도 됩니다.
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            w="50px"
            h="30px"
            bgColor={coachingActive ? 'yellow' : 'white'}
            borderRadius="20px"
            onClick={handleCoachingClick}
          >
            코칭
          </Button>
          <Button
            w="50px"
            h="30px"
            bgColor={!coachingActive ? 'yellow' : 'white'}
            borderRadius="20px"
            onClick={handleRunningClick}
          >
            러닝
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Input
            w="300px"
            h="25px"
            bgColor="white"
            border="1px solid #ccc"
            fontSize="12px"
            textalign="left"
            placeholder="검색어를 입력하세요(방 제목, 개설자)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div id="Learning-List">

        </div>
      </div>
    </ChakraProvider>
  );
}


export default Learning;