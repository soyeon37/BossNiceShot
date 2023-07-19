import React from "react";
import PartGolf from "./slide-part/PartGolf";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { NavLink } from "react-router-dom"
import { ArrowForwardIcon } from '@chakra-ui/icons';

function Carousel({ props }) {
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
        <SplideSlide>
          <PartGolf />
        </SplideSlide>
        <SplideSlide>
          <PartGolf />
        </SplideSlide>
        <SplideSlide>
          <PartGolf />
        </SplideSlide>
        <SplideSlide>
          <PartGolf />
        </SplideSlide>
        <SplideSlide>
          <PartGolf />
        </SplideSlide>
      </Splide>

      <NavLink to="/golffield" style={({ isActive, isPending }) => {
        return {
          fontWeight: isActive ? "bold" : "",
        };
      }}>

        <div className="text-and-icon">
          <div className="text-and-icon-text">
            더 많은 골프장 찾기
          </div>
          <div className="text-and-icon-icon">
            <ArrowForwardIcon boxSize={10} />
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Carousel;
