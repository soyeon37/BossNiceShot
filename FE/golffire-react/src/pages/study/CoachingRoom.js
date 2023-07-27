import React, { useEffect } from 'react'
import "./study.css";

function CoachingRoom() {
  useEffect(() => {
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
    // 컴포넌트 언마운트 시 스크롤 다시 활성화
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const CopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다")
    });
  };


  return (
    <div className="coachingroom-container">
      <div className="box-head">
        <div className="box-roomtype">
          <span className="typename">코칭</span>
        </div>
        방 제목
        <div className="copy-url" onClick={CopyUrl}></div>
      </div>
      <div className="box-body">
        <div className="grid-item item1">
          {/* 러닝룸에서 포함 시킬 것. <div className="coachcam">코치</div> */ }
          <div className="mycam">나</div>
        </div>
        <div className="grid-item item2">
          <div className="box-splide">나는 카로셀</div>
          <div className="box-mainrtc">나는 화면공유</div>
          <div className="box-art">나는 그림판</div>
        </div>
        <div className="grid-item item3">
          <div className="box-chatview">나는 채팅방</div>
          <div className="box-chatinput">나는 채팅 입력창</div>
        </div>
      </div>
    </div>
  )
}

export default CoachingRoom