import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";
import GolfBox from "./GolfBox";

import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "./Golffield.css";

function Golffield() {
  // 출력할 골프장 정보 변수
  const golfClubs = [
    {
      id: 1,
      name: "하이골프클럽11",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
      callNumber: "02-9999-9999",
    },
    {
      id: 2,
      name: "하이골프클럽22",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
      callNumber: "02-9999-9999",
    },
    {
      id: 3,
      name: "하이골프클럽33",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
      callNumber: "02-9999-9999",
    },
    {
      id: 4,
      name: "하이골프클럽44",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
      callNumber: "02-9999-9999",
    },
    // Add more golf club data objects here
  ];

  // 지역 검색 필터 변수
  const areas = [
    { id: "0", area: "전국" },
    { id: "1", area: "서울" },
    { id: "2", area: "경기" },
    { id: "3", area: "강원" },
  ];

  const [area, setArea] = useState(areas[0].id);
  const [searchWord, setSearchWord] = useState("");

  const handleSelectArea = (e) => {
    setArea(e.target.value);
  };

  // 검색창 내 문자 변화 감지
  const handleSearchWord = (e) => {
    setSearchWord(e.target.value);
  };

  // 엔터 키 눌림 감지
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      doSearchWord();
    }
  };

  // 검색
  const doSearchWord = () => {
    console.log(searchWord);
  };

  // Result Pagination
  const itemsPerPage = 10; // 페이지 당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 변환에 따른 아이템 출력
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return golfClubs.slice(startIndex, endIndex);
  };

  // 페이징 컨트롤 인식
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(golfClubs.length / itemsPerPage);

  return (
    <div id="Golffield">
      <div id="golf-title">골프장 검색</div>
      <div id="golf-search">
        <div id="search-box">
          <select value={area} id="areaSelector" onChange={handleSelectArea}>
            {areas.map((item) => (
              <option key={item.id} value={item.area}>
                {item.area}
              </option>
            ))}
          </select>
          <input
            id="searchWord"
            defaultValue={searchWord}
            onChange={handleSearchWord}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
          />
          <button className="icon-div" onClick={doSearchWord}>
            <SearchIcon boxSize={6} />
          </button>
        </div>
        <div id="result-box">
          <div id="kakao-map">
            <KakaoMap />
          </div>
          <div id="result">
            <div id="result-list">
              {getCurrentPageItems().map((club) => (
                <GolfBox
                  key={club.id}
                  name={club.name}
                  address={club.address}
                  callNumber={club.callNumber}
                />
              ))}
            </div>
            <div id="result-control">
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
        </div>
      </div>
    </div>
  );
}

export default Golffield;
