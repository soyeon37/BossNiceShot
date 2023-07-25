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
      title: "XX컵 메달리스트 꿀팁 방출",
      detail: "지난 달 열린 XX컵 메달리스트가 알려주는 꿀팁! 10시까지 합니다!",
      name: "골프러버S2",
      member: "8",
    },
    {
      id: 2,
      type: "러닝",
      title: "알려줘요",
      detail: "스탠스 궁금해요!",
      name: "김싸피",
      member: "1",
    },
    {
      id: 3,
      type: "코칭",
      title: "XX컵 메달리스트 꿀팁 방출2",
      detail: "지난 달 열린 XX컵 메달리스트가 알려주는 꿀팁! 10시까지 합니다!",
      name: "골프러버S2",
      member: "8",
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
          perPage: 2.5,
          focus: "center",
        }}
      >
        {golfInfos.map((info) => (
          <SplideSlide key={info.id}>
            <PartLearning
              type={info.type}
              title={info.title}
              detail={info.detial}
              name={info.name}
              member={info.member}
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
