import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AccompanyBox from "./AccompanyBox";
import TeeRed from "../../assets/source/icons/flag-red.png";
import TeeWhite from "../../assets/source/icons/flag-white.png";
import TeeBlack from "../../assets/source/icons/flag-black.png";
import TeeAll from "../../assets/source/icons/flag-all.png";

import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

function AccompanyList() {
  // 검색을 위한 변수
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState("title");
  const [selectedFollow, setSelectedFollow] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    // 검색 기능을 추가하고 원하는 작업을 수행할 수 있습니다.
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSearchClick = () => {
    // 검색 버튼을 클릭할 때 서버로 검색 필터와 검색 값 전송하는 로직을 추가합니다.
    if (searchValue.trim() !== "") {
      const searchData = {
        filter: searchFilter,
        value: searchValue,
      };

      // 여기서 searchData를 서버로 전송하는 API 호출 등의 작업을 수행할 수 있습니다.
      console.log("Sending searchData to server:", searchData);
    }
  };

  // 팔로잉 라디오 버튼 함수
  const handleFollowChange = () => {
    setSelectedFollow(!selectedFollow);
  }

  // 이 위는 검색 필터 기능들
  // 이 아래는 리스트 관련 기능들
  const [accompanyList, setAccompanyList] = useState([{}, {}, {}, {}, {}, {}]);

  // 동행 모집 리스트
  const accompanyData = [
    { id: 1, title: "제목 1", authorId: "123456", authorNickname: "김싸피가 먹는 고구마", tee: "red", placeId: 1, date: "2023.09.30 13:00" },
    { id: 2, title: "제목 2", authorId: "456789", authorNickname: "황싸피", tee: "white", placeId: 4, date: "2023.09.30 13:00" },
    { id: 3, title: "제목 3", authorId: "789777", authorNickname: "한싸피", tee: "all", placeId: 5, date: "2023.09.30 13:00" },
    { id: 4, title: "제목 4", authorId: "123123", authorNickname: "함싸피", tee: "black", placeId: 89, date: "2024.09.30 13:00" },
    { id: 5, title: "제목 5", authorId: "999999", authorNickname: "문싸피", tee: "white", placeId: 210, date: "2023.09.30 18:00" },
    { id: 6, title: "제목 6", authorId: "333333", authorNickname: "최싸피", tee: "red", placeId: 61, date: "2023.09.30 10:00" },
  ];

  const teeMap = {
    red: TeeRed,
    white: TeeWhite,
    black: TeeBlack,
    all: TeeAll,
  }

  // 처음 화면이 로딩 될 때 동행 리스트 정보 호출
  useEffect(() => {
    setAccompanyList(accompanyData);
  }, []);

  // accompanyData의 tee 값에 따라 티박스 이미지 변경 함수

  // accompanyData의 placeId 값에 따라 골프장 이름 반환 함수
  // 외부 component 사용

  const handleCreateRectangle = (title, author) => {
    const newRectangle = {
      id: accompanyList.length + 1,
      title: title,
      author: author,
    };
    setAccompanyList([...accompanyList, newRectangle]);
  };

  // Result Pagination
  const itemsPerPage = 6; // 페이지 당 아이템 수
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
    <div className="list-container">
      <div className={isJoining ? 'list-container-list-selected' : 'list-container-list-unselected'}>
        <div className="list-head">
          <Link to="/createaccompany">
            <div className="head-create-button bg-accompany">+ 모집하기</div>
          </Link>
          <div className="search-container">
            {/* 검색창 */}
            <input
              className="search-input-box"
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="검색어를 입력하세요"
            />
            <button id="search-icon" onClick={handleSearchClick}>
              <SearchIcon boxSize={6} />
            </button>

            {/* 검색 필터 */}
            <select
              id="searchFilter"
              className="search-filter"
              value={searchFilter}
              onChange={handleFilterChange}
            >
              <option value="title">제목</option>
              <option value="author">작성자</option>
              <option value="titleAndContent">제목+내용</option>
            </select>

          </div>
          <div className="checkbox-div">
            <label>
              <input
                className="checkbox"
                type="checkbox"
                checked={selectedFollow}
                onChange={handleFollowChange}
              />
              팔로잉
            </label>
          </div>
        </div>

        <div className="list-body">
          {getCurrentPageItems().map((accompanyRoom) => (
            <AccompanyBox
              key={accompanyRoom.id}
              id={accompanyRoom.id}
              title={accompanyRoom.title}
              tee={teeMap[accompanyRoom.tee]}
              author={accompanyRoom.authorNickname}
              placeId={accompanyRoom.placeId}
              date={accompanyRoom.date}
              handleJoinButtonClick={handleJoinButtonClick}
            />
          ))}
        </div>

        <div className="list-footer">
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

      {/* 선택 시 나타나는 정보 */}
      {isJoining && selectedRectangle && (
        <div className="selected-container">
          <div className="selected-container-head">
            <div className="selected-container-title">
              <div className="title-text">
                글 제목
              </div>
              <div
                className="title-close"
                onClick={() => setIsJoining(false)}
              >
                X
              </div>
            </div>
            <div className="selected-container-user">
              글 작성자
            </div>
          </div>
          <div className="selected-container-body">
            <div>내용</div>
            <div>동행 일시</div>
            <div>골프장</div>
            <div>참여 인원</div>
            <div>티 박스</div>
          </div>

          <div className="selected-container-footer">
            <button className=""> 참여하기</button>
          </div>

        </div>

        // <div className="joining-room">
        //   <div onClick={() => setIsJoining(false)}>닫기</div>
        //   <div className="joining-title">{selectedRectangle.title}</div>
        //   <div className="joining-author">
        //     <div className="joining-author-box">작성자: {selectedRectangle.author}</div>
        //   </div>
        //   <div className="joining-description">
        //     방설명{selectedRectangle.description} {/* 설명이 여기에 들어감 */}
        //   </div>
        //   <div className="joining-button">
        //     <Link to={`/accompanyroom/${selectedRectangle.id}`}>
        //       <button>참여하기</button>
        //     </Link>
        //   </div>

        // </div>
      )}

      {/* 배경 div */}
      <div className="list-background-div bg-accompany"></div>
    </div>
  );
}

export default AccompanyList;
