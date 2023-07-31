import React, { useState } from "react";
import {Link} from "react-router-dom";
import {
  ChakraProvider,
  Flex,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";

import {
  SmallAddIcon,
} from "@chakra-ui/icons";
import "./study.css"

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
      <div id="Study">
        <h1>스터디</h1>
        <h2>
          희망하는 코칭/러닝 방에 입장하세요.<br />
          새로운 방을 만들어도 됩니다.
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            w="50px"
            h="30px"
            bgColor={coachingActive ? '#72CE27' : 'white'}
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
        <div id="Search">
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
        <div className="Study-List">
          <Flex flexWrap="wrap" justifyContent="flex-start">
            <Link to="/createroom">
              <Box
                w="400px"
                h="240px"
                bgColor="#D9D9D9"
                borderRadius="48px"
                my="10px"
                mx="25px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <SmallAddIcon w={8} h={8} />
              </Box>
            </Link>
            {/* 새로운 박스 1 */}
            <Link to="/coachingroom">
              <Box
                w="400px"
                h="240px"
                bgColor="#D9D9D9"
                borderRadius="48px"
                my="10px"
                mx="25px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
              </Box>
            </Link>

            {/* 새로운 박스 2 */}
            <Link to="/coachingroom">
              <Box
                w="400px"
                h="240px"
                bgColor="#D9D9D9"
                borderRadius="48px"
                my="10px"
                mx="25px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
              </Box>
            </Link>

            {/* 새로운 박스 3 */}
            <Link to="/coachingroom">
              <Box
                w="400px"
                h="240px"
                bgColor="#D9D9D9"
                borderRadius="48px"
                my="10px"
                mx="25px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
              </Box>
            </Link>
          </Flex>
        </div>
      </div>
    </ChakraProvider>
  );
}


export default Learning;