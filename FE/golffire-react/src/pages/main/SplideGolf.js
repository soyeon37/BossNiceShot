import React from "react";
import PartGolf from "./slide-part/PartGolf";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
          height: "50%",
          width: "100%",
          type: "loop",
          perPage: 3,
          focus: "center",
        }}
      >
        <SplideSlide>
          <PartGolf />
        </SplideSlide>
        <SplideSlide>
          <PartGolf />
        </SplideSlide>
      </Splide>

      <div></div>
    </div>
  );
}

export default Carousel;
