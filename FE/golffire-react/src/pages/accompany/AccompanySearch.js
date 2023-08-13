import React, { useState } from "react";

function AccompanySearch() {
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState("title");

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

  return (
    <div className="search-container">
      <div className="filter-container">
        <label htmlFor="searchFilter">검색 필터:</label>
        <select id="searchFilter" value={searchFilter} onChange={handleFilterChange}>
          <option value="title">제목</option>
          <option value="author">작성자</option>
          <option value="titleAndContent">제목+내용</option>
        </select>
      </div>
      티박스 선택 드롭다운 추가
      <div className="input-container">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={handleSearchClick}>검색</button>
      </div>
    </div>
  );
}
export default AccompanySearch;
