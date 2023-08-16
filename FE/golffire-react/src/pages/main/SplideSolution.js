import React from "react";
import PartSolution from "./slide-part/PartSolution";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import iconImg from "../../assets/source/mascot/crying.png";

import { NavLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { background } from "@chakra-ui/react";

function SplideSolution({ props }) {
  return (
    <div id="splide-solution" style={{ height: "350px" }}>
      <Splide
        options={{ rewind: true, type: "loop" }}
        aria-label="React Splide Example"
        // style={{ height: "300px" }}
      >
        <SplideSlide style={{ height: "300px", width: "200px", background: "white" }}>
          <img src={iconImg} alt="Image 1" />
        </SplideSlide>

        <SplideSlide style={{ height: "300px", width: "200px", background: "blue" }}>
          <img src={iconImg} alt="Image 2" />
        </SplideSlide>
        <SplideSlide style={{ height: "300px", width: "200px", background: "red" }}>
          <img src={iconImg} alt="Image 2" />
        </SplideSlide>
        <SplideSlide style={{ height: "300px", width: "200px", background: "pink" }}>
          <img src={iconImg} alt="Image 2" />
        </SplideSlide>
      </Splide>
    </div>
  );
}
export default SplideSolution;
