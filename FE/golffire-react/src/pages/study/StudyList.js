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
    <div id = "study-container" className='study-container'>
      <div className={`container-head shadow-${coachingActive ? 'coaching' : 'learning'}`}>
        <div className="container-head-title">스터디</div>
        <div className="container-head-desc">
          희망하는 코칭/러닝 방에 입장하세요.
        </div>
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
        </div>
      </div>
      <div className='container-body'>
        {coachingActive ? <CoachingList /> : <LearningList />}
      </div>
    </div>
  );
}

export default StudyList