import React from "react";
import Kakao from "./Kakao";

import "./Golffield.css";

function Golffield() {
  return (
    <div id="Golffield">
      <div id="search-box">

        검색창 공간 : 이름 검색 & 지역 검색
      </div>

      <Kakao />
      <div>
        여기에 리스트

      </div>
    </div>
  );
};

export default Golffield;
