import React, { useState } from 'react';

function SearchBox() {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    // 검색 기능을 추가하고 원하는 작업을 수행할 수 있습니다.
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={handleInputChange}
      placeholder="검색어를 입력하세요"
    />
  );
}

export default SearchBox;