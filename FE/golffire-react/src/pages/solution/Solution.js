import React from "react";
import { Link } from "react-router-dom"; // If you are using react-router

function Solution() {
  return (
    <div id="Solution" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div className="solution-wrapper">
        <div className="solution-wrapper-title">솔루션 받고 싶은 코스를 선택하세요</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/solution/halfswing">
            <button className="card-button half-swing">HALF</button>
          </Link>
          <Link to="/solution/fullswing">
            <button className="card-button full-swing">FULL</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Solution;
