import React from "react";
import PartGolf from "./slide-part/PartGolf";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { NavLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function SplideGolf({ props }) {
  const golfInfos = [
    {
      id: 1,
      name: "하이골프클럽1",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
    },
    {
      id: 2,
      name: "하이골프클럽2",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
    },
    {
      id: 3,
      name: "하이골프클럽3",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
    },
    {
      id: 4,
      name: "하이골프클럽4",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
    },
    {
      id: 5,
      name: "하이골프클럽5",
      address: "서울특별시 서초구 잠원동 신반포로47길 77 두원빌딩 1층",
    },
    // DB로부터 10개 정도 받아오기
  ];

  return (
    <div id="splide-golf">
      <Splide
        aria-label="Golf Splide"
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
        
        {golfInfos.map((info) => (
          <SplideSlide key={info.id}>
            <PartGolf name={info.name} address={info.address} />
          </SplideSlide>
        ))}

      </Splide>

      <NavLink
        to="/golffield"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
          };
        }}
      >
        <div className="text-and-icon">
          <div className="text-and-icon-text">더 많은 골프장 찾기</div>
          <div className="text-and-icon-icon">
            <ArrowForwardIcon boxSize={10} />
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default SplideGolf;
