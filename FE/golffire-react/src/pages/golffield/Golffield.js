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
  let arrayText = ["번호", "사업장명", "소재지전체주소", "도로명전체주소", "소재지전화", "좌표정보(x)", "좌표정보(y)"]
  let arrayIndex = [];
  if (dataSize > 0) {
    dataKeys = Object.keys(data[0]);
    for (var i = 0; i < arrayText.length; i++) {
      arrayIndex.push(dataKeys.indexOf(arrayText[i]));
    }
  }

  const [golfClub, setGolfClub] = useState(data); // 검색 필터링된 골프장 리스트
  const [searchWord, setSearchWord] = useState(""); // 검색어

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

  // KakaoMap에 전달되는 변수와 함수
  const [centerId, setCenterId] = useState(1); // 지도의 중심 좌표가 되는 골프장 번호

  const getId = () => {
    const id = [];
    const cur = getCurrentPageItems(golfClub);
    for (var i = 0; i < cur.length; i++) {
      id.push(cur[i][dataKeys[arrayIndex[0]]])
    }
    // console.log("저장된 id: ", id);
    return id;
  }

  const getAddress = () => {
    const add = [];
    const cur = getCurrentPageItems(golfClub);
    for (var i = 0; i < cur.length; i++) {
      add.push(cur[i][dataKeys[arrayIndex[2]]], cur[i][dataKeys[arrayIndex[3]]])
    }
    // console.log("저장된 add: ", add);
    return add;
  }
  const getLatLng = () => {
    const latlng = [];
    const cur = getCurrentPageItems(golfClub);
    for (var i = 0; i < cur.length; i++) {
      latlng.push(cur[i][dataKeys[arrayIndex[5]]], cur[i][dataKeys[arrayIndex[6]]])
    }
    // console.log("저장된 latlng: ", latlng);
    return latlng;
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
              centerId={centerId}
              getId={getId()}
              getAddress={getAddress()}
              getLatLng={getLatLng()}
            />
          </div>
          <div id="result">
            <div id="result-list">
              {getCurrentPageItems(golfClub).map((club) => (
                <GolfBox
                  key={club[dataKeys[arrayIndex[0]]]}
                  id={club[dataKeys[arrayIndex[0]]]}
                  name={club[dataKeys[arrayIndex[1]]]}
                  address1={club[dataKeys[arrayIndex[2]]]}
                  address2={club[dataKeys[arrayIndex[3]]]}
                  callNumber={club[dataKeys[arrayIndex[4]]]}
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
