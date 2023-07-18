import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Carousel({ props }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Splide
          aria-label="My Favorite Images"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          options={{
            width: "50%",
          }}
        >
          <SplideSlide>
            안녕따리
          </SplideSlide>
          <SplideSlide>
            바이따리
            </SplideSlide>
          <SplideSlide>
            바이따리
            </SplideSlide>
          <SplideSlide>
            바이따리
            </SplideSlide>
          <SplideSlide>
            바이따리
            </SplideSlide>
        </Splide>
      </div>
    );
  }
  
  export default Carousel;