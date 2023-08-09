import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AccompanySearch from "./AccompanySearch";

import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import "./accompany.css";

function AccompanyList() {
  const [accompanyList, setAccompanyList] = useState([{}, {}, {}, {}, {}, {}]);

  // 동행 모집 리스트
  const accompanyData = [
    { id: 1, title: "제목 1", author: "작성자 1" },
    { id: 2, title: "제목 2", author: "작성자 2" },
    { id: 3, title: "제목 3", author: "작성자 3" },
    { id: 4, title: "제목 4", author: "작성자 4" },
    { id: 5, title: "제목 5", author: "작성자 5" },
    { id: 6, title: "제목 6", author: "작성자 6" },
  ];

  // 처음 화면이 로딩 될 때 동행 리스트 정보 호출
  useEffect(() => {
    setAccompanyList(accompanyData);
  }, []);

  const handleCreateRectangle = (title, author) => {
    const newRectangle = {
      id: accompanyList.length + 1,
      title: title,
      author: author,
    };
    setAccompanyList([...accompanyList, newRectangle]);
  };

  // Result Pagination
  const itemsPerPage = 4; // 페이지 당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 변환에 따른 아이템 출력
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return accompanyData.slice(startIndex, endIndex);
  };

  // 페이징 컨트롤 인식

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(accompanyList.length / itemsPerPage);

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
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
    // 필터 기능을 추가하고 원하는 작업을 수행할 수 있습니다.
  };

  return (
    <div className="accompanylist-container">
      <div className="accompanylist">
        <div className="accompanylist-head">
          <Link to="/createaccompany">
            <div className="head-create-button">새 동행 모집하기</div>
          </Link>
          <AccompanySearch />
          <Checkbox colorScheme="green">팔로잉</Checkbox>
        </div>

        <div className="accompanylist-body">
          {getCurrentPageItems().map((rectangle) => (
            <div key={rectangle.id} className="accompany-room">
              <h3>{rectangle.title}</h3>
              <p>작성자: {rectangle.author}</p>
              <button onClick={() => handleJoinButtonClick(rectangle)}>참여하기</button>
            </div>
          ))}
        </div>

        <div className="accompanylist-footer">
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
        <div className="joining-room">
          <div className="joining-title">{selectedRectangle.title}</div>
          <div className="joining-author">
            <div className="joining-author-box">작성자: {selectedRectangle.author}</div>
          </div>
          <div className="joining-description">
            방설명{selectedRectangle.description} {/* 설명이 여기에 들어감 */}
          </div>
          <div className="joining-button">
            <Link to={`/accompanyroom/${selectedRectangle.id}`}>
              <button>참여하기</button>
            </Link>
          </div>
        </div>
      )}

      {/* 배경 div */}
      {isJoining ? (
        // 방 선택 시
        <div className="selected-box"></div>
      ) : (
        // 방 미선택 시
        <div className="unselected-box"></div>
      )}
    </div>
  );
}

export default AccompanyList;
