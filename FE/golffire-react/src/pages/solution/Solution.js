import React from "react";
import { Link } from "react-router-dom"; // If you are using react-router

function Solution() {
  return (
    <div id="Solution" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div className="solution-wrapper-title">솔루션 받고 싶은 코스를 선택하세요</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/solution/halfswing">
            <button className="card-button half-swing"></button>
            <div className="half-swing-title">하프 스윙 솔루셔닝</div>
          </Link>
          
          <Link to="/solution/fullswing">
            <button className="card-button full-swing"></button>
            <div className="full-swing-title">풀 스윙 솔루셔닝</div>
          </Link>
        </div>
    </div>
  );
}

export default Solution;
