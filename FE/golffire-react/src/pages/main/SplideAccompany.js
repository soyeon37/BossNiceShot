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
      title: "같이 골프 칠 분 구합니다!",
      golf_num: 1,
      date: "2023.08.31",
    },
    {
      id: 2,
      title: "같이 골프 칠 분?",
      golf_num: 2,
      date: "2023.08.31",
    },
    {
      id: 3,
      title: "골프짱 3인방",
      golf_num: 3,
      date: "2023.08.31",
    },
    {
      id: 4,
      title: "레드 고? 4명 찾음",
      golf_num: 4,
      date: "2023.08.31",
    },
    {
      id: 5,
      title: "딱 5번만 해볼라구요",
      golf_num: 5,
      date: "2023.08.31",
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
          pagination: false,
        }}
      >
        {AccInfos.map((info) => (
          <SplideSlide key={info.id}>
            <PartAccompany
              title={info.title}
              golf_num={info.golf_num}
              date={info.date}
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
