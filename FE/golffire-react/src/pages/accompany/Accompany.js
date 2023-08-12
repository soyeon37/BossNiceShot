import React from "react";
import AccompanyList from "./AccompanyList";
import "./Accompany.css";

function Accompany() {
  return (
    <div id="accompany-container" className="container">
      <div className="container-head shadow-accompany">
        <div className="container-head-title">동행</div>
        <div className="container-head-desc">
          원하는 날짜와 장소에 같이 갈 동행을 구해보아요.
        </div>
      </div>
      <div className="container-body">
        <AccompanyList />
      </div>
    </div>
  );
}

export default Accompany;
