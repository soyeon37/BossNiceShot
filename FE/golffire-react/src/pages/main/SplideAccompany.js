import React, { useEffectF } from "react";
import { NavLink } from "react-router-dom";

import file from "../../assets/golffield.json";
import PartAccompany from "./slide-part/PartAccompany";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import "@splidejs/react-splide/css";

function SplideAccompany({ props }) {
  const dataArray = file;
  const dataGolffield = dataArray.map(item => ({
    번호: item["번호"],
    사업장명: item["사업장명"]
  }));

  // 서버로부터 받은 동행 모집 관련 정보
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

  const parseGolffield = (golfId) => {
    for(const item of dataGolffield) {
      if(item.번호 === golfId) {
        console.log(golfId, "에 맞는 골프장? ", item.사업장명)
        return item.사업자명
      }
    }
  }

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
              golf_place={parseGolffield(info.golf_num)}
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
