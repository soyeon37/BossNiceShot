import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";

import GolfBox from "./GolfBox";
import file from "../../assets/golffield.json";
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "./Golffield.css";

function Golffield() {
  // 출력할 골프장 정보 변수
  const data = file;
  const dataSize = file.length;

  let dataKeys;
  let arrayText = ["번호", "사업장명", "소재지전체주소", "소재지전화", "좌표정보(x)", "좌표정보(y)"]
  let arrayIndex = [];
  if (dataSize > 0) {
    dataKeys = Object.keys(data[0]);
    for (var i = 0; i < arrayText.length; i++) {
      arrayIndex.push(dataKeys.indexOf(arrayText[i]));
    }
  }

  const [golfClub, setGolfClub] = useState(data); // 검색 필터링된 골프장 리스트
  const [searchWord, setSearchWord] = useState(""); // 검색어
  const [clubs, setClubs] = useState(); // 현재 페이지에 보이는 골프장 리스트
  const [centerId, setCenterId] = useState(); // 지도의 중심 좌표가 되는 골프장 번호

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
    let searchResult = [];
    for (var i = 0; i < dataSize; i++) {
      const d = data[i];
      if (d[dataKeys[arrayIndex[1]]].includes(searchWord)) {
        searchResult.push(data[i]);
      }
    }
    setGolfClub(searchResult);
    setCurrentPage(1);
  };

  // Result Pagination
  const itemsPerPage = 10; // 페이지 당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);

  let isFirstPage = currentPage === 1;
  let isLastPage = currentPage === Math.ceil(golfClub.length / itemsPerPage);

  // 페이지 변환에 따른 아이템 출력
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return golfClub.slice(startIndex, endIndex);
    
  };

  // 페이징 컨트롤 인식
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // KakaoMap에 전달되는 함수들
  const getLocations = () => {
    const loc = []; // 현재 페이지에 보여지는 리스트 속 골프장의 좌표들
    const cur = getCurrentPageItems(golfClub);
    for (var i = 0; i < cur.length; i++) {
      loc.push(cur[i][dataKeys[arrayIndex[4]]], cur[i][dataKeys[arrayIndex[5]]])
    }
    console.log("지금 보이는 애들 중 첫번째id? ", centerId);
    // 주소 없으면 찐 주소 parsing 해보기..
    
    // const dd = cur[0][dataKeys[arrayIndex[0]]];
    // setCenterId(dd);
    // setCenterId(cur[0][dataKeys[arrayIndex[0]]]) // 첫 골프장을 중심 좌표로 설정
    return loc;
  }

  const getCenterId = () => {
    // setCenterId(clubs[0]);
    console.log("getCenterId 호출...", centerId);
    return centerId;
  }

  return (
    <div id="Golffield">
      <div id="golf-title">골프장 검색</div>
      <div id="golf-search">
        <div id="search-box">
          <input
            id="searchWord"
            defaultValue={searchWord}
            onChange={handleSearchWord}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
          />
          <button id="search-icon" onClick={doSearchWord}>
            <SearchIcon boxSize={6} />
          </button>
        </div>
        <div id="result-box">
          <div id="kakao-map">
            <KakaoMap
              getLocations={getLocations()}
              getCenterId={getCenterId()}
            />
          </div>
          <div id="result">
            <div id="result-list">
              <div style={{ textAlign: "left", color: "gray" }}>
                골프장을 선택 시, 네이버 검색 결과로 연결됩니다.
              </div>
              {getCurrentPageItems(golfClub).map((club) => (
                <GolfBox
                  key={club[dataKeys[arrayIndex[0]]]}
                  id={club[dataKeys[arrayIndex[0]]]}
                  name={club[dataKeys[arrayIndex[1]]]}
                  address={club[dataKeys[arrayIndex[2]]]}
                  callNumber={club[dataKeys[arrayIndex[3]]]}
                  setCenter={setCenterId}
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
