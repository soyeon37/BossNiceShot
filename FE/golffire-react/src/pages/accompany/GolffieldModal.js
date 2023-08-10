import React, { useState } from "react";

import GolfBox from "../golffield/GolfBox";
import file from "../../assets/golffield.json";
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
// import "./Golffield.css";

import { GrClose } from "react-icons/gr";

function GolffieldModal({ toggleModal, setAccompanyPlace }) {
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
    }))
    const dataSize = dataGolffield.length;

    const [temporaryPlace, setTemporaryPlace] = useState(0)
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
            id.push(cur[i].번호)
        }
        // console.log("저장된 id: ", id);
        return id;
    }

    const getAddress = () => {
        const add = [];
        const cur = getCurrentPageItems(golfClub);
        for (var i = 0; i < cur.length; i++) {
            add.push(cur[i].소재지전체주소, cur[i].도로명전체주소)
        }
        // console.log("저장된 add: ", add);
        return add;
    }

    const getLatLng = () => {
        const latlng = [];
        const cur = getCurrentPageItems(golfClub);
        for (var i = 0; i < cur.length; i++) {
            latlng.push(cur[i].x, cur[i].y)
        }
        // console.log("저장된 latlng: ", latlng);
        return latlng;
    }


    // Confirm Button
    const setAndToggleModal = () => {
        setAccompanyPlace(temporaryPlace);
        toggleModal();
    }

    return (
        <div id='SelectGolffield'>
            <div id='golffield-modal'>
                <div id='modal-header'>
                    <div id="modal-title">
                        골프장 선택
                    </div>
                    <h1><GrClose size={30} onClick={toggleModal} /></h1>
                </div>
                <div id='select-modal-body'>
                    <div id='search-box'>
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

                    <div id='result-box'></div>
                </div>
                <div id='modal-footer'>
                    <button
                        className='modal-button cancel'
                        onClick={toggleModal}>
                        취소
                    </button><button
                        className='modal-button confirm'
                        onClick={setAndToggleModal}>
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GolffieldModal;
