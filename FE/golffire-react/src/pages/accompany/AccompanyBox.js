import React from "react";

import ProfileImg from "../../assets/source/imgs/favicon.png";
import { MdSportsGolf } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

function AccompanyBox({
  title,
  id,
  tee,
  author,
  place,
  date,
  handleSelectButtonClick,
  dateFormat,
  isSelected,
}) {

  // 사진 출력을 위한 변수
  let profileValues = "";
  // if (testProfile.image) profileValues = testProfile.image.split(' ');

  // 사진 배경 색상을 map으로 관리
  const colorMap = {
    "red": "#F24141",
    "yellow": "#FFE000",
    "green": "#3BD641",
    "blue": "#80CAFF",
    "white": "#FFFFFF",
  }
  const checkProfilePic = () => {
    // console.log("프로필 값을 확인: ", userProfile);
    
    if (true) {
    // if (userProfile) {
      // console.log("가능!");
      return true;
    } else {
      // console.log("쓸 수 없는 사진임");
      return false;
    }
  }

  return (
    <div
      className={`accompany-box ${isSelected ? "selected" : ""}`} // isSelected에 따라 클래스를 추가
      onClick={() => handleSelectButtonClick(id)}
    >
      <div className="accompany-box-title">
        {title}
        <img className="tee-icon" src={tee} alt="tee-image" />
      </div>
      <div className="box-author-position">
        <div className="box-author">
          <img className="profile-icon" src={ProfileImg} alt={`$author님`} />

          {author}
        </div>
      </div>
      <div className="accompany-box-date">
        <MdSportsGolf className="react-icon" />
        {dateFormat(date)}
      </div>
      <div className="accompany-box-place">
        <FaMapMarkerAlt className="react-icon" color="red" />
        {place}
      </div>
      <div className="accompany-box-button-position">
        <div className="accompany-box-button" onClick={() => handleSelectButtonClick(id)}>
          자세히 보기
        </div>
      </div>
    </div>
  );
}

export default AccompanyBox;
