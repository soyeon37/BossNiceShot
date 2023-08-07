import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AccompanySearch from './AccompanySearch'; 
import FollowFilter from './FollowFilter';

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "./accompany.css";

function AccompanyList() {
  
  const mockRectangles = [
    { id: 1, title: '제목 1', author: '작성자 1' },
    { id: 2, title: '제목 2', author: '작성자 2' },
    { id: 3, title: '제목 3', author: '작성자 3' },
    { id: 4, title: '제목 4', author: '작성자 4' },
    { id: 5, title: '제목 5', author: '작성자 5' },
  ];

  const [rectangles, setRectangles] = useState(mockRectangles);

  const handleCreateRectangle = (title, author) => {
    const newRectangle = {
      id: rectangles.length + 1,
      title: title,
      author: author,
    };
    setRectangles([...rectangles, newRectangle]);
  };

  // Result Pagination
  const itemsPerPage = 4; // 페이지 당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 변환에 따른 아이템 출력
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rectangles.slice(startIndex, endIndex);
  };
  
   // 페이징 컨트롤 인식

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(rectangles.length / itemsPerPage);

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
    <div className='accompanylist-container'>
      <div className='accompanylist'>
        <div className='accompanylist-head'>
          <div className='accompany-create'>
            <Link to="/createaccompany">
              +동행모집하기
            </Link>
          </div>
          <div className='accompany-search'>
            <AccompanySearch />
            <FollowFilter />
          </div>
        </div>
        <div className='accompany-body'>
          {getCurrentPageItems().map(rectangle => (
            <div key={rectangle.id} className='accompany-room'>
              <h3>{rectangle.title}</h3>
              <p>작성자: {rectangle.author}</p>
              <button onClick={() => handleJoinButtonClick(rectangle)}>참여하기</button>
            </div>
          ))}
        </div>
        <div className='accompany-footer'>
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
            <Link to={`/accompanyroom/${selectedRectangle.id}`}>
              <button>참여하기</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccompanyList