import React from "react";
import { MdSportsGolf } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import NaverLogo from "../../assets/source/icons/naver_icon.png"
function GolfBox({ id, name, address1, address2, callNumber, setCenter }) {
  let address = address1 ? address1 : address2;

  // 네이버 검색창 연결 함수
  const searchOnNaver = () => {
    const naverSearchUrl = `https://search.naver.com/search.naver?query=` + name;
    window.open(naverSearchUrl, '_blank');
  }

  return (
    <div className="GolfBox" onClick={() => setCenter(id)}>
      <div className="golfbox-title">
        <MdSportsGolf className="react-icon-golf" size={30}/>
        <div className="golfbox-name">
          {name}
        </div>
        <div className="golfbox-naver" onClick={() => searchOnNaver()}>
          <img src={NaverLogo} alt={`네이버 ` + name + ` 검색 결과`} />
        </div>
      </div>
      <FaMapMarkerAlt className="react-icon-marker" color="red" />
      <div className="golfbox-add">{address ? address : '등록된 주소가 없습니다.'}</div>
      {callNumber ? <FaPhoneAlt className="react-icon-marker" color="black" /> : ''}
      <div className="golfbox-call">{callNumber}</div>
    </div>
  );
}

export default GolfBox;
