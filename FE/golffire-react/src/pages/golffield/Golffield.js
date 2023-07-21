import React from "react";
import Kakao from "./Kakao";

import { Select, Input } from '@chakra-ui/react'
import GolfBox from "./GolfBox";
import "./Golffield.css";

function Golffield() {
  const golfClubs = [
    {
      name: '하이골프클럽11',
      address: '서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층',
      phoneNumber: '02-9999-9999',
    },
    {
      name: '하이골프클럽22',
      address: '서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층',
      phoneNumber: '02-9999-9999',
    },
    {
      name: '하이골프클럽23',
      address: '서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층',
      phoneNumber: '02-9999-9999',
    },
    // Add more golf club data objects here
  ];

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


      <div id="result-box">
        <div id="kakao-map">
          <Kakao />
        </div>

        <div id="result-list">
          {golfClubs.map((club, index) => (
            <GolfBox
              key={index}
              name={club.name}
              address={club.address}
              phoneNumber={club.phoneNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Golffield;
