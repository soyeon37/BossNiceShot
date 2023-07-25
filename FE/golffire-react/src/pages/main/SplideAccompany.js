import React from "react";
import PartAccompany from "./slide-part/PartAccompany";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { NavLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function SplideAccompany({ props }) {
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
    <div id="splide-accompany">
      <Splide
        aria-label="Accompany Splide"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        options={{
          type: "loop",
          perPage: 3.5,
          focus: "center",
        }}
      >
        {AccInfos.map((info) => (
          <SplideSlide key={info.id}>
            <PartAccompany
              user_name={info.user_name}
              title={info.title}
              address={info.address}
              member_num={info.member_num}
              deadline={info.deadline}
            />
          </SplideSlide>
        ))}
      </Splide>

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
export default SplideAccompany;
