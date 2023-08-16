import React, { useState } from "react";
import { MdSportsGolf } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import NaverLogo from "../../assets/source/icons/naver_icon.png";
function GolfBox({ id, name, address1, address2, callNumber, setCenter, isSelected, onSelect }) {
  let address = address1 ? address1 : address2;
  // 네이버 검색창 연결 함수
  const searchOnNaver = () => {
    const naverSearchUrl = `https://search.naver.com/search.naver?query=` + name;
    window.open(naverSearchUrl, "_blank");
  };
  const handleClick = () => {
    setCenter(id);
    onSelect(id); // GolfBox가 클릭되었을 때 호출
  };
  return (
    <div
      className={`GolfBox ${isSelected ? "selected" : ""}`} // isSelected에 따라 클래스를 추가
      onClick={handleClick}
    >
      {/* <div
      className="GolfBox"
      onClick={() => {
        setCenter(id);
      }}
    > */}
      <div className="golfbox-top">
        <div className="golfbox-title">
          <MdSportsGolf className="react-icon-golf" size={30} />
          <div className="golfbox-name">{name}</div>
        </div>

        <div className="golfbox-content">
          <FaMapMarkerAlt className="react-icon-marker" color="red" />
          <div className="golfbox-add">{address ? address : "등록된 주소가 없습니다."}</div>
          {callNumber ? <FaPhoneAlt className="react-icon-marker" color="black" /> : ""}
          <div className="golfbox-call">{callNumber}</div>
        </div>
      </div>
      <div className="golfbox-button">
        <button className="button golf" onClick={() => searchOnNaver()}>
          자세히 보기
        </button>
      </div>
    </div>
  );
}

export default GolfBox;
