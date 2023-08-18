import React from "react";

import { MdSportsGolf } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

function AccompanyBox({
  id,
  title,
  tee,
  author,
  authorImage,
  place,
  date,
  dateFormat,
  isSelected,
  handleSelectButtonClick,
}) {

  // 사진 출력을 위한 변수
  let profileValues = "";
  if (authorImage) profileValues = authorImage.split(' ');

  // 사진 배경 색상을 map으로 관리
  const colorMap = {
    "red": "#F24141",
    "yellow": "#FFE000",
    "green": "#3BD641",
    "blue": "#80CAFF",
    "white": "#FFFFFF",
  }

  const checkProfilePic = () => {
    // return false;
    // console.log("프로필 값을 확인: ", authorImage);

    if (profileValues[0]) {
      return true;
    } else {
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
          {checkProfilePic() ? (
            <img className="box-profile-icon" alt={`&{author}님`}
              src={require(`../../assets/source/profile/${profileValues[0]}.png`)} />
          ) : (
            <img className="box-profile-icon" alt={`&{author}님`}
              src={require(`../../assets/source/profile/green_suncap_tiger.png`)} />
          )}
          {author}
        </div>
      </div>

      < div className="accompany-box-date" >
        <MdSportsGolf className="react-icon" />
        {dateFormat(date)}
      </div >
      <div className="accompany-box-place">
        <FaMapMarkerAlt className="react-icon" color="red" />
        {place}
      </div>
      <div className="accompany-box-button-position">
        <div className="accompany-box-button" onClick={() => handleSelectButtonClick(id)}>
          자세히 보기
        </div>
      </div>
    </div >
  );
}

export default AccompanyBox;
