import React from "react";
import Kakao from "./Kakao";

import { Select, Input } from '@chakra-ui/react'
import "./Golffield.css";

function Golffield() {
  return (
    <div id="Golffield">
      <div id="search-box">
        <div>
          <Select placeholder='Select option'>
            <option value='option1'>지역을 선택하세요</option>
            <option value='option2'>서울</option>
            <option value='option3'>강릉</option>
          </Select>
        </div>
        <div>
          <Input placeholder='검색어를 입력하세요' />
        </div>
      </div>


      <div id="map-box">
        <div id="kakao-map">
          <Kakao />

        </div>
        <div id="field-list">
          list <br />
          list <br />
          list <br />
          list <br />
          list <br />
        </div>
      </div>
    </div>
  );
};

export default Golffield;
