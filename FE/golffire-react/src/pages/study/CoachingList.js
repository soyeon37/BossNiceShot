import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CoachingBox from "./CoachingBox";
import CoachingRoom from "./CoachingRoom";

import ProfileImg from "../../assets/source/imgs/favicon.png";

import { MdSportsGolf } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SearchIcon } from "@chakra-ui/icons";

// Redux
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import "./study.css";

function CoachingList() {
  // Redux
  const dispatch = useDispatch();
  // 사용자 정보(userId)로 axios 수행
  const userId = useSelector((state) => state.userInfoFeature.userId);
  // AccessToken (Redux)
  const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
  // Header (AccessToken)
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const navigate = useNavigate();

  const studyType = "COACHING";

  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [coachingList, setCoachingList] = useState([]);

  // 검색 조건
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState("title");
  const [selectedAttandable, setSelectedAttandable] = useState(false);

  useEffect(() => {
    getCoachingList(1);
  }, []);

  useEffect(() => {
    setSearchValue("");
  }, [searchFilter]);

  const getCoachingList = (currentPage) => {
    const apiUrl =
      process.env.REACT_APP_SERVER_URL +
      "/api/study/allsearch?page=" +
      (currentPage - 1) +
      "&size=" +
      pageSize;

    console.log(apiUrl);

    setCurrentPage(currentPage);

    const data = {
      type: "COACHING",
    };

    console.log("코칭 리스트 조회");
    axios.post(apiUrl, data)
      .then((response) => {
        console.log(response);

        setCoachingList(response.data.studyList);
        setTotalPages(response.data.totalPages);
      });
  };

  const getCoachingSearchList = (searchValue, currentPage) => {
    const apiUrl =
      process.env.REACT_APP_SERVER_URL +
      "/api/study/list/COACHING?page=" +
      (currentPage - 1) +
      "&size=" +
      pageSize;

    const studySearchRequest = {
      category: searchFilter,
      keyword: searchValue,
    };

    setSearchValue(searchValue);
    setCurrentPage(currentPage);

    console.log("코칭 리스트 검색 조회");
    console.log(studySearchRequest);

    axios.post(apiUrl, studySearchRequest)
      .then((response) => {
        console.log(response);

        setCoachingList(response.data.studyList);
        setTotalPages(response.data.totalPages);
      });
  };

  const getCoachingAttandableList = (currentPage) => {
    const apiUrl =
      process.env.REACT_APP_SERVER_URL +
      "/api/study/list/COACHING/attandable?page=" +
      (currentPage - 1) +
      "&size=" +
      pageSize;

    setCurrentPage(currentPage);

    console.log("참여 가능한 코칭 리스트 검색 조회");

    axios.get(apiUrl)
      .then((response) => {
        console.log(response);

        setCoachingList(response.data.studyList);
        setTotalPages(response.data.totalPages);
      });
  };

  const getCoachingAttandableSearchList = (searchValue, currentPage) => {
    const apiUrl =
      process.env.REACT_APP_SERVER_URL +
      "/api/study/list/COACHING/attandable?page=" +
      (currentPage - 1) +
      "&size=" +
      pageSize;

    setSearchValue(searchValue);
    setCurrentPage(currentPage);

    const studySearchRequest = {
      category: searchFilter,
      keyword: searchValue,
    };

    console.log("참여 가능한 코칭 리스트 검색 조회");
    console.log(studySearchRequest);

    axios.post(apiUrl, studySearchRequest)
      .then((response) => {
        console.log(response);

        setCoachingList(response.data.studyList);
        setTotalPages(response.data.totalPages);
      });
  };

  const handleAttandClick = (study) => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/study/info/" + study.id;

    axios.get(apiUrl)
      .then((response) => {
        if (response.data.capacity > response.data.studyUserCount) {
          enterStudyUser(study);
        } else {
          alert("참가 인원이 많아 코칭룸에 참여하실 수 없습니다.");
        }
      });
  }

  // 코칭룸 입장
  const enterStudyUser = (study) => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/study/user";

    const studyUserRequest = {
      studyId: study.id,
    };

    console.log("코칭룸 입장");
    console.log(studyUserRequest);

    axios.post(apiUrl, studyUserRequest)
      .then((response) => {
        console.log(response);

        // 코칭룸으로 이동
        navigate('/CoachingRoom', {
          state: {
            type: studyType,
            study: study,
            studyUser: response.data
          }
        });
      });
  };

  const handlePageChange = (pageNumber) => {
    if (selectedAttandable) {
      // 참여 가능한 코칭 리스트
      if (searchValue.trim() == "") {
        // 미검색
        getCoachingAttandableList(pageNumber);
      } else {
        // 검색
        getCoachingAttandableSearchList(searchValue, pageNumber);
      }
    } else {
      // 전체 코칭 리스트
      if (searchValue.trim() == "") {
        // 미검색
        getCoachingList(pageNumber);
      } else {
        // 검색
        getCoachingSearchList(searchValue, pageNumber);
      }
    }
  };

  useEffect(() => {
    setSearchFilter("title");
    handlePageChange(currentPage);
  }, [selectedAttandable]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchValue.trim() == "") {
      alert("검색어를 입력하세요.");
    } else {
      if (selectedAttandable) {
        // 참여 가능한 코칭 리스트
        if (searchValue.trim() == "") {
          // 미검색
          getCoachingAttandableList(currentPage);
        } else {
          // 검색
          getCoachingAttandableSearchList(searchValue, currentPage);
        }
      } else {
        // 전체 코칭 리스트
        if (searchValue.trim() == "") {
          // 미검색
          getCoachingList(currentPage);
        } else {
          // 검색
          getCoachingSearchList(searchValue, currentPage);
        }
      }
    }
  };

  const handleAttadableChange = () => {
    setSelectedAttandable(!selectedAttandable);
  };

  const [isSelected, setIsSelected] = useState(false); // 글 선택 여부
  const [selectedId, setSelectedId] = useState(null); // 선택된 글 번호
  const [selectedContent, setSelectedContent] = useState(null); // 선택된 글 내용

  const handleSelectButtonClick = (id, index) => {
    if (isSelected && selectedId && selectedId === id) {
      setIsSelected(false);
      setSelectedId(null);
    } else {
      console.log("스터디 선택");
      console.log(coachingList[index]);
      console.log(id, index);
      setSelectedContent(coachingList[index]);
      setIsSelected(true);
      setSelectedId(id);
    }
  };

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
    <div className='list-container'>
      <div className={isSelected ? 'list-container-list-selected' : 'list-container-list-unselected'}>
        <div className="list-head">
          <Link to="/createcroom">
            <div className="head-create-button bg-coach">+ 코칭하기</div>
          </Link>

          <div className="search-container">
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

            {/* 검색 필터 */}
            <select
              id="searchFilter"
              className="search-filter"
              value={searchFilter}
              onChange={handleFilterChange}
            >
              <option value="title">제목</option>
              <option value="nickname">작성자</option>
              <option value="titleAndDescription">제목 및 내용</option>
            </select>
          </div>

          <div className="checkbox-div">
            <label class="switch" value={selectedAttandable} onChange={handleAttadableChange}>
              <input type="checkbox" />
              <span class="slider-coaching round"></span>
            </label>
            <div>참여 가능</div>
          </div>
        </div>

        <div className={isSelected ? 'list-body-selected' : 'list-body-unselected'}>
          {coachingList.map((coaching, index) => (
            <CoachingBox
              key={coaching.id}
              index={index}
              id={coaching.id}
              title={coaching.title}
              reservedTime={coaching.reservedTime}
              capacity={coaching.capacity}
              studyUserCount={coaching.studyUserCount}
              memberNickname={coaching.memberNickname}
              memberImage={coaching.memberImage}
              handleSelectButtonClick={handleSelectButtonClick}
              dateFormat={dateFormat}
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
      <div className="list-background-div bg-coach"></div>

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
                <img
                  className="profile-icon"
                  src={ProfileImg}
                  alt={`${selectedContent.memberNickname}님`}
                />
                {selectedContent.memberNickname}
              </div>
            </div>
          </div>

          <div className="selected-container-body">
            <div className="coaching-textarea">{selectedContent.description}</div>
            <div className="selected-container-info">
              <MdSportsGolf className="react-icon" />
              <div className="info-text-left">{dateFormat(selectedContent.reservedTime)}</div>
              <div className="info-text-right">
                <BsFillPersonFill className="react-icon" />
                {selectedContent.studyUserCount} / {selectedContent.capacity}
              </div>
            </div>
          </div>
          <div className="selected-container-footer">
            <button
              className="button bg-coaching"
              onClick={() => handleAttandClick(selectedContent)}
            >
              {" "}
              참여하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoachingList;
