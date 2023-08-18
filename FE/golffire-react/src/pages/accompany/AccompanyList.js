import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getNameById } from "../golffield/ParseGolfId";
import AccompanyBox from "./AccompanyBox";

import ProfileImg from "../../assets/source/imgs/favicon.png";
import flagred from "../../assets/source/icons/flag-red.png";
import flagwhite from "../../assets/source/icons/flag-white.png";
import flagblack from "../../assets/source/icons/flag-black.png";
import flagall from "../../assets/source/icons/flag-all.png";

import { MdSportsGolf } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SearchIcon } from "@chakra-ui/icons";

// Redux
import { useSelector } from "react-redux";

import axios from "axios";

function AccompanyList() {
  // 사용자 정보(userId)로 로그인 여부 판단
  const userId = useSelector((state) => state.userInfoFeature.userId);
  const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 페이징 컨트롤 인식
  const handlePageChange = (pageNumber) => {
    getCompanionList(searchValue, pageNumber);
  };

  const [companionList, setCompanionList] = useState([]);

  // 처음 화면이 로딩 될 때 동행 리스트 정보 호출
  useEffect(() => {
    getCompanionList("", 1);
  }, []);

  const getCompanionList = (searchValue, currentPage) => {
    console.log("동행 리스트 호출");
    const apiUrl =
      process.env.REACT_APP_SERVER_URL +
      "/api/companion/search?page=" +
      (currentPage - 1) +
      "&size=" +
      pageSize;

    setSearchValue(searchValue);
    setCurrentPage(currentPage);

    const companionSearchRequest = {
      title: searchFilter == "title" && searchValue.trim() != "" ? searchValue : null,
      memberNickname: searchFilter == "author" && searchValue.trim() != "" ? searchValue : null,
      description: searchFilter == "titleContent" && searchValue.trim() != "" ? searchValue : null,
      teeBox: searchTeeBox,
      followerId: selectedFollow ? userId : null,
    };

    console.log("검색:");
    console.log(companionSearchRequest);

    axios.post(apiUrl, companionSearchRequest).then((response) => {
      // axios.post(apiUrl, companionSearchRequest, { headers }).then((response) => {
      console.log("리스트 받은거 성공: ", response);

      setCompanionList(response.data.companionList);
      setTotalPages(response.data.totalPages);
    }).catch((error) => {
      console.log("리스트 받다가 에러: ", error);
    });
  };

  // 검색을 위한 변수
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState("title");
  const [searchTeeBox, setSearchTeeBox] = useState("NONE");
  const [selectedFollow, setSelectedFollow] = useState(false);

  useEffect(() => {
    setSearchValue("");
  }, [searchFilter]);

  useEffect(() => {
    setSearchFilter("title");
    getCompanionList("", 1);
  }, [selectedFollow]);

  useEffect(() => {
    setSearchFilter("title");
    getCompanionList("", 1);
  }, [searchTeeBox]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleTeeBoxChange = (searchTeeBox) => {
    setSearchTeeBox(searchTeeBox);
  };

  const handleSearchClick = () => {
    if (searchValue.trim() == "") {
      alert("검색어를 입력하세요.");
    } else {
      getCompanionList(searchValue, 1);
    }
  }

  // 팔로잉 라디오 버튼 함수
  const handleFollowChange = () => {
    setSelectedFollow(!selectedFollow);
  };

  // 이미지 파일 경로를 객체로 관리
  const teeMap = {
    RED: flagred,
    WHITE: flagwhite,
    BLACK: flagblack,
    NONE: flagall,
  };

  const [isSelected, setIsSelected] = useState(false); // 글 선택 여부
  const [selectedId, setSelectedId] = useState(null); // 선택된 글 번호
  const [selectedContent, setSelectedContent] = useState(null); // 선택된 글 내용

  const handleSelectButtonClick = (id) => {
    console.log("자세히보기!")
    if (isSelected && selectedId && selectedId === id) {
      setIsSelected(false);
      setSelectedId(null);
    } else {
      console.log("로그인한 상태라서 이렇게 검색");
      getSelectedContent(id);
    }
  };

  const [attandableStatus, setAttandableStatus] = useState(false);

  const getSelectedContent = (id) => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion/info/" + id;

    axios.get(apiUrl).then((response) => {
      setSelectedContent(response.data);

      console.log("동행 모집 한 건 조회");
      console.log(response);

      // 사용자 로그인 유무 확인
      if (userId) { // 로그인한 경우
        const companion = response.data;

        // 사용자가 이미 신청한 동행인지 확인하기
        checkDuplicateCompanionUser(companion);
      } else { // 로그인하지 않은 경우
        setAttandableStatus(true);
      }

      setIsSelected(true);
      setSelectedId(id);
    });
  };

  // 동행 모집 신청 여부 확인
  const checkDuplicateCompanionUser = (companion) => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/companion/user/check/' + companion.id;

    axios.get(apiUrl)
      .then((response) => {
        console.log("동행 모집 신청 여부 확인:", response);

        if (!response.data) { // 동행 모집을 신청하지 않은 경우
          setAttandableStatus(true);
        } else { // 동행 모집을 신청한 경우
          setAttandableStatus(false);
        }
      });
  };

  // 참여하기 버튼 클릭 시
  const handleAttandClick = (companion) => {
    if (attandableStatus) { // 참여하기 버튼 클릭
      if (!userId) { // 로그인 하지 않은 경우
        alert("로그인 후 신청합니다.");
      } else { // 로그인한 경우
        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/companion/info/' + companion.id;

        axios.get(apiUrl) // 동행 모집의 현재 인원 확인한다.
          .then((response) => {
            if (response.data.capacity > response.data.companionUserCount) { // 모집 인원보다 현재 인원이 적으면
              const companionUserRequset = {
                companionId: companion.id
              };

              addCompanionUser(companionUserRequset); // 사용자가 이미 신청한 동행인지 확인한다.
            } else { // 모집 인원이 다 찬 경우
              alert("참가 인원이 많아 동행 모집에 참여하실 수 없습니다.");
            }
          });
      }
    } else { // 취소하기 버튼 클릭
      const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/companion/user/' + companion.id;

      axios.delete(apiUrl);
    }
  };

  const addCompanionUser = (companionUserRequset) => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion/user";

    console.log("동행 모집 참여자 생성");
    axios.post(apiUrl, companionUserRequset).then((response) => {
      console.log(response);
      alert("동행 참여 완료!");
    });
  }

  const dateFormat = (input) => {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  return (
    <div className="list-container">
      <div
        className={isSelected ? "list-container-list-selected" : "list-container-list-unselected"}
      >
        <div className="list-head">
          <Link to="/createaccompany">
            <div className="head-create-button bg-accompany">+ 모집하기</div>
          </Link>

          <div className="search-container">
            {/* 검색창 */}
            {searchFilter === "tee" ? (
              <div className="search-tee-box-container">
                <div className="search-tee-items">
                  <div className="search-tee-item">
                    <img
                      src={flagred}
                      alt="레드 티 박스"
                      onClick={() => handleTeeBoxChange("RED")}
                      className={`search-tee-img${teeMap[searchTeeBox] === "flagred" ? "-selected" : ""
                        }`}
                    />
                  </div>
                  <div className="search-tee-item">
                    <img
                      src={flagwhite}
                      alt="화이트 티 박스"
                      onClick={() => handleTeeBoxChange("WHITE")}
                      className={`search-tee-img${teeMap[searchTeeBox] === "flagwhite" ? "-selected" : ""
                        }`}
                    />
                  </div>
                  <div className="search-tee-item">
                    <img
                      src={flagblack}
                      alt="블랙 티 박스"
                      onClick={() => handleTeeBoxChange("BLACK")}
                      className={`search-tee-img${teeMap[searchTeeBox] === "flagblack" ? "-selected" : ""
                        }`}
                    />
                  </div>
                  <div className="search-tee-item">
                    <img
                      src={flagall}
                      alt="모든 티 박스"
                      onClick={() => handleTeeBoxChange("NONE")}
                      className={`search-tee-img${teeMap[searchTeeBox] === "flagall" ? "-selected" : ""
                        }`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="search-input-container">
                <input
                  className="search-input-box"
                  type="text"
                  value={searchValue}
                  onChange={handleInputChange}
                  placeholder="검색어를 입력하세요"
                />
                <button id="search-input-icon" onClick={handleSearchClick}>
                  <SearchIcon boxSize={6} color="#8D8F98" />
                </button>
              </div>
            )}
            {/* 검색 필터 */}
            <select
              id="searchFilter"
              className="search-filter"
              value={searchFilter}
              onChange={handleFilterChange}
            >
              <option value="title">제목</option>
              <option value="author">작성자</option>
              <option value="titleContent">제목 및 내용</option>
              <option value="tee">티 박스</option>
            </select>
          </div>
          <div className="checkbox-div">
            {/* 팔로잉 필터 제거 */}
            {/* <label className="switch" value={selectedFollow} onChange={handleFollowChange}>
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <div>팔로잉</div> */}
          </div>
        </div>
        <div className={isSelected ? "list-body-selected" : "list-body-unselected"}>
          {companionList.map((accompanyRoom) => (
            <AccompanyBox
              key={accompanyRoom.id}
              id={accompanyRoom.id}
              title={accompanyRoom.title}
              tee={teeMap[accompanyRoom.teeBox]}
              author={accompanyRoom.memberNickname}
              authorImage={accompanyRoom.memberImage}
              place={getNameById(accompanyRoom.field)}
              date={accompanyRoom.teeUptime}
              dateFormat={dateFormat}
              isSelected={accompanyRoom.isSelected} // isSelected를 prop으로 전달
              handleSelectButtonClick={handleSelectButtonClick}
            />
          ))}
        </div>

        <div className="list-footer">
          <button
            className="control-arrow"
            disabled={currentPage == 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <IoIosArrowBack className="option-title-icon" />
          </button>
          <div id="control-num">{currentPage}</div>
          <button
            className="control-arrow"
            disabled={currentPage == totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <IoIosArrowForward className="option-title-icon" />
          </button>
        </div>
      </div>
      {/* 배경 div */}
      <div className="list-background-div bg-accompany"></div>

      {/* 선택 시 나타나는 정보 */}
      {isSelected && selectedId && (
        <div className="selected-container">
          <div className="selected-container-head">
            <div className="selected-container-title">
              <div className="title-text">{selectedContent.title}</div>
              <h1 className="cursor-able">
                <GrClose size={30} onClick={() => setIsSelected(false)} />
              </h1>
            </div>
            <div className="box-author-position">
              <div className="box-author">
                <img className="profile-icon" src={ProfileImg} alt={`$author님`} />
                {selectedContent.memberNickname}
              </div>
            </div>
          </div>
          <div className="selected-container-body">
            <div className="accompany-textarea">{selectedContent.description}</div>
            <div className="selected-container-info">
              <FaMapMarkerAlt className="react-icon" color="red" />
              <div className="info-text-left">{getNameById(selectedContent.field)}</div>
              <div className="info-text-right">
                <img className="profile-icon" src={teeMap[selectedContent.teeBox]}></img>
              </div>
            </div>
            <div className="selected-container-info">
              <MdSportsGolf className="react-icon" />
              <div className="info-text-left">{dateFormat(selectedContent.teeUpTime)}</div>
              <div className="info-text-right">
                <BsFillPersonFill className="react-icon" />
                {selectedContent.companionUserCount} / {selectedContent.capacity}
              </div>
            </div>
          </div>
          <div className="selected-container-footer">
            {userId == selectedContent.id ? (
              <button className="button accompany-button bg-accompany"
                onClick={() => handleAttandClick(selectedContent)}> 수정하기</button>
            ) : (
              <>
                {selectedContent.attandableStatus ? (
                  <button className="button accompany-button bg-accompany"
                    onClick={() => handleAttandClick(selectedContent)}> 취소하기</button>
                ) : (
                  <button className="button accompany-button bg-accompany"
                    onClick={() => handleAttandClick(selectedContent)}> 참여하기</button>
                )}
              </>
            )}

          </div>
        </div>
      )
      }
    </div >
  );
}

export default AccompanyList;
