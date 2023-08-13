import React from "react";
import PartSolution from "./slide-part/PartSolution";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import iconImg from "../../assets/source/mascot/crying.png";

import { NavLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { background } from "@chakra-ui/react";

function SplideSolution({ props }) {
  const AccInfos = [
    {
      id: 1,
      user_name: "김싸피",
      title: "같이 골프 칠 분 구합니다!",
      address: "서울특별시 동작구",
      member_num: "1/6",
      deadline: "2023.08.31",
    },
    {
      id: 2,
      user_name: "이싸피",
      title: "같이 골프 칠 분?",
      address: "서울특별시 강남구",
      member_num: "2/7",
      deadline: "2023.08.31",
    },
    {
      id: 3,
      user_name: "이싸피2",
      title: "같이 골프 칠 분?",
      address: "서울특별시 강남구",
      member_num: "2/7",
      deadline: "2023.08.31",
    },
    {
      id: 4,
      user_name: "이싸피3",
      title: "같이 골프 칠 분?",
      address: "서울특별시 강남구",
      member_num: "2/7",
      deadline: "2023.08.31",
    },
    {
      id: 5,
      user_name: "이싸피4",
      title: "같이 골프 칠 분?",
      address: "서울특별시 강남구",
      member_num: "2/7",
      deadline: "2023.08.31",
    },
  ];

  return (
    <div id="splide-solution">
   <Splide options={ { rewind: true } } aria-label="React Splide Example">
      <SplideSlide>
        <img src={iconImg} alt="Image 1"/>
      </SplideSlide>
      <SplideSlide>
        <img src={iconImg} alt="Image 2"/>
      </SplideSlide>
    </Splide>
      {/* <Splide
        aria-label="Solution Splide"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          background: "pink"
        }}
        options={{
          type: "loop",
          perPage: 3.5,
          focus: "center",
        }}
      >

        <SplideSlide>
            <div style={{width : '100%', height : '100%', background:'red'}}></div>
        </SplideSlide>
      </Splide> */}

      <NavLink
        to="/accompany"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
          };
        }}
      >
        <div className="text-and-icon">
          <div className="text-and-icon-text">더 많은 동행 모집 보기</div>
          <div className="text-and-icon-icon">
            <ArrowForwardIcon boxSize={10} />
          </div>
        </div>
      </NavLink>
    </div>
  );
}
export default SplideSolution;
