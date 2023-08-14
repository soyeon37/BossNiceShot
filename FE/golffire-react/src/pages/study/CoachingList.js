import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'; 
import FollowFilter from './FollowFilter';

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "./study.css";

import axios from "axios";

function CoachingList() {
  const pageSize = 6; 
  const [currentPage, setCurrentPage] = useState(1);

  const [coachingList, setCoachingList] = useState([]);
  
  useEffect(() => {
    getCoachingList();
  });

  const getCoachingList = () => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/study/COACHING";

    console.log("코칭 리스트 조회");
    axios.get(apiUrl)
    .then((response) => {
      console.log(response);

      setCoachingList(response.data);
    });
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(coachingList.length / pageSize);

  // 참여하기 버튼
  const [isJoining, setIsJoining] = useState(false);
  const [selectedRectangle, setSelectedRectangle] = useState(null);

  const handleJoinButtonClick = (rectangle) => {
    // 같은 id의 러닝룸 설명 div가 이미 나타나있는 경우, 눌렀을 때 해당 div 사라지도록 처리
    if (isJoining && selectedRectangle && selectedRectangle.id === rectangle.id) {
      setIsJoining(false);
      setSelectedRectangle(null);
    } else {
      setSelectedRectangle(rectangle);
      setIsJoining(true);
    }
  };

  return (
    <div className='learninglist-container'>
      <div className='learninglist'>
        <div className='learninglist-head'>
          <div className='learning-create'>
            <Link to="/createcroom">
              +코칭하기
            </Link>
          </div>
          <div className='learning-search'>
            <SearchBox />
            <FollowFilter />
          </div>
        </div>
        <div className='learninglist-body'>
          {coachingList.map(rectangle => (
            <div key={rectangle.id} className='learning-room'>
              <h3>{rectangle.title}</h3>
              <p>작성자: {rectangle.memberNickname}</p>
              <button onClick={() => handleJoinButtonClick(rectangle)}>참여하기</button>
            </div>
          ))}
        </div>
        <div className='learninglist-footer'>
          <button
            className="control-arrow"
            disabled={isFirstPage}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ArrowLeftIcon boxSize={6} />
          </button>
          <div id="control-num">{currentPage}</div>
          <button
            className="control-arrow"
            disabled={isLastPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ArrowRightIcon boxSize={6} />
          </button>    
        </div>
      </div>
      {isJoining && selectedRectangle && (
        <div className='joining-room'>
          <div className='joining-title'>{selectedRectangle.title}</div>
          <div className='joining-author'>
            <div className='joining-author-box'>
              작성자: {selectedRectangle.author}
            </div>
          </div>
          <div className='joining-description'>
            방설명{selectedRectangle.description} {/* 설명이 여기에 들어감 */}
          </div>
          <div className='joining-button'>
            <Link to={`/coachingroom/${selectedRectangle.id}`}>
              <button>참여하기</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoachingList