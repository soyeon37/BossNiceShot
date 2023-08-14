import React from "react";
import PartLearning from "./slide-part/PartLearning";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { NavLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function SplideLearning({ props }) {
  const golfInfos = [
    {
      id: 1,
      type: "코칭",
      title: "제9회 골프대회 수상 꿀팁 방출",
      name: "골프러버S2",
    },
    {
      id: 2,
      type: "러닝",
      title: "궁금한거 알려주세요",
      name: "김싸피",
    },
    {
      id: 3,
      type: "코칭",
      title: "지난 대회에서 써먹은 자세 교정법",
      name: "골프러버S2",
    },
  ];

  return (
    <div id="splide-learning">
      <Splide
        aria-label="Learning Splide"
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
        {golfInfos.map((info) => (
          <SplideSlide key={info.id}>
            <PartLearning
              type={info.type}
              title={info.title}
              name={info.name}
            />
          </SplideSlide>
        ))}
      </Splide>

      <NavLink
        to="/learning"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
          };
        }}
      >
        <div className="text-and-icon">
          <div className="text-and-icon-text">더 많은 코칭/러닝 방 보기</div>
          <div className="text-and-icon-icon">
            <ArrowForwardIcon boxSize={10} />
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default SplideLearning;
