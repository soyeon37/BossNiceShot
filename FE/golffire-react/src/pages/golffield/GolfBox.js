import React from "react";

function GolfBox({ name, address, callNumber }) {
  // 네이버 검색창 연결 함수
  const searchOnNaver = () => {
    const naverSearchUrl = `https://search.naver.com/search.naver?query=` + name;
    window.open(naverSearchUrl, '_blank');
  }

  return (
    <div className="GolfBox"
      onClick={() => searchOnNaver()}>
      <div className="golfbox-name">{name}</div>
      <div className="golfbox-add">{address ? address : '등록된 주소가 없습니다.'}</div>
      <div className="golfbox-call">{callNumber}</div>
    </div>
  );
}

export default GolfBox;
