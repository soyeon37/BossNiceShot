import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CoachingList from './CoachingList';
import LearningList from './LearningList';

import {
  Button
} from "@chakra-ui/react";
import "./study.css";

function StudyList() {

  const [coachingActive, setCoachingActive] = useState(true);

  const handleCoachingClick = () => {
    setCoachingActive(true);
  };

  const handleRunningClick = () => {
    setCoachingActive(false);
  };

  return (
    <div className='list-container'>
      <div className='list-head'>
        <h1>스터디</h1>
        <h2>
          희망하는 코칭/러닝 방에 입장하세요.<br />
          새로운 방을 만들어도 됩니다.
        </h2>
        <div className='button-container'>
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
          <Link to='/coachingroom'>
            <Button
              w="50px"
              h="30px"
            >
              임시
            </Button>
          </Link>
        </div>
      </div>
      <div className='list-body'>
        {coachingActive ? <CoachingList /> : <LearningList />}
      </div>
    </div>
  )
}

export default StudyList