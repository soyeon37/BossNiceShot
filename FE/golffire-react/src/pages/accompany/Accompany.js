import React from "react";
import AccompanyList from "./AccompanyList";
import "./Accompany.css";

function Accompany() {
  return (
    <div className="accompany-container">
      <div className="accompany-head">
        <div className="accompany-title">동행</div>
        <div className="accompany-description">
          함께 골프 치러 갈 동행을 모집하세요.
          <br />
          모집 중인 동행에 참여 신청을 해도 좋습니다.
        </div>
      </div>
      <div className="accompany-body">
        <AccompanyList />
      </div>
    </div>
  );
}

export default Accompany;
