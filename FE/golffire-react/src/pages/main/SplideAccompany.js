import React from "react";
import { NavLink } from "react-router-dom";

import PartAccompany from "./slide-part/PartAccompany";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import "@splidejs/react-splide/css";

function SplideAccompany({ props }) {
  // 서버로부터 받은 동행 모집 관련 정보
  const AccInfos = [
    {
      id: 1,
      title: "같이 골프 칠 분 구합니다!",
      golf: 1,
      date: "2023.08.31",
    },
    {
      id: 2,
      title: "같이 골프 칠 분?",
      golf: 2,
      date: "2023.08.31",
    },
    {
      id: 3,
      title: "골프짱 3인방",
      golf: 3,
      date: "2023.08.31",
    },
    {
      id: 4,
      title: "레드 고? 4명 찾음",
      golf: 4,
      date: "2023.08.31",
    },
    {
      id: 5,
      title: "딱 5번만 해볼라구요",
      golf: 5,
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
          <SplideSlide key={info.id} style={{ height: "500px" }}>
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
