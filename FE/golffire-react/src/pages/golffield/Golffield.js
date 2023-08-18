import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";

import GolfBox from "./GolfBox";
import file from "../../assets/golffield";
import PinImg from "../../assets/source/icons/pin.png";
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "./Golffield.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Golffield() {
  const [selectedGolfBoxId, setSelectedGolfBoxId] = useState(null); // 선택된 GolfBox의 ID 저장

  // GolfBox 선택 시 처리 함수
  const handleGolfBoxSelect = (id) => {
    setSelectedGolfBoxId(id);
  };
  // 출력할 골프장 정보 변수
  const dataArray = file;
  const dataGolffield = dataArray.map((item) => ({
    번호: item["번호"],
    사업장명: item["사업장명"],
    소재지전체주소: item["소재지전체주소"],
    도로명전체주소: item["도로명전체주소"],
    소재지전화: item["소재지전화"],
    x: item["좌표정보(x)"],
    y: item["좌표정보(y)"],
  }));
  const dataSize = dataGolffield.length;

  const [golfClub, setGolfClub] = useState(dataGolffield); // 검색 필터링된 골프장 리스트
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
      const d = dataGolffield[i];
      if (d.사업장명.includes(searchWord)) {
        searchResult.push(dataGolffield[i]);
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
      id.push(cur[i].번호);
    }
    // console.log("저장된 id: ", id);
    return id;
  };

  const getAddress = () => {
    const add = [];
    const cur = getCurrentPageItems(golfClub);
    for (var i = 0; i < cur.length; i++) {
      add.push(cur[i].소재지전체주소, cur[i].도로명전체주소);
    }
    // console.log("저장된 add: ", add);
    return add;
  };

  const getLatLng = () => {
    const latlng = [];
    const cur = getCurrentPageItems(golfClub);
    for (var i = 0; i < cur.length; i++) {
      latlng.push(cur[i].x, cur[i].y);
    }
    // console.log("저장된 latlng: ", latlng);
    return latlng;
  };

  return (
    // <div id="accompany-container" className="container">

    // </div>
    <div id="golffield-container" className="container">
      <div className="container-head">
        <div className="container-head-title">골프장</div>
        <div className="container-head-desc">근처 골프장을 찾아보아요.</div>

        <img className="list-head-pin" src={PinImg} alt="pin" />
        <div className="list-head-shadow bg-golffield"></div>
      </div>

      <div className="container-body">
        <div className="" id="golf-search">
          <div className="search-container">
            <div className="search-input-container">
              <input
                className="search-input-box"
                defaultValue={searchWord}
                onChange={handleSearchWord}
                onKeyDown={handleKeyDown}
                placeholder="검색어를 입력하세요"
              />
              <button id="search-input-icon" onClick={doSearchWord}>
                <SearchIcon boxSize={6} color="#8D8F98" />
              </button>
            </div>
          </div>

          <div id="result-box">
            <div id="result">
              <div id="result-list">
                {getCurrentPageItems(dataGolffield).map((club) => (
                  <GolfBox
                    key={club.번호}
                    id={club.번호}
                    name={club.사업장명}
                    address1={club.소재지전체주소}
                    address2={club.도로명전체주소}
                    callNumber={club.소재지전화}
                    setCenter={setCenterId}
                    isSelected={club.번호 === selectedGolfBoxId} // 해당 GolfBox가 선택되었는지 여부
                    onSelect={handleGolfBoxSelect} // GolfBox 선택 시 처리 함수 호출
                  />
                ))}
              </div>
              <div id="result-control">
                <button
                  className="control-arrow"
                  disabled={isFirstPage}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <IoIosArrowBack className="option-title-icon" />
                </button>
                <div id="control-num">{currentPage}</div>
                <button
                  className="control-arrow"
                  disabled={isLastPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <IoIosArrowForward className="option-title-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="list-background-div bg-golffield"></div>
        <div id="kakao-map">
          <KakaoMap
            centerId={centerId}
            getId={getId()}
            getAddress={getAddress()}
            getLatLng={getLatLng()}
          />
        </div>
      </div>
    </div>
  );
}

export default Golffield;
