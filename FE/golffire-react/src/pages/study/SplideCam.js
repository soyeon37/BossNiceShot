import React from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


function SplideCam({}) {
    const camInfos = [
      {
        id: 1,
        name: "김싸피",
      },
      {
        id: 2,
        name: "함싸피",
      },
      {
        id: 3,
        name: "한싸피",
      },
      {
        id: 4,
        name: "김싸피",
      },
      {
        id: 5,
        name: "김싸피",
      },
    ];
  
    return (
      <div id="splide-cam">
        <Splide
          aria-label="Cam Splide"
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
          
          {camInfos.map((info) => (
            <SplideSlide key={info.id}>
              <div className="cam-info">
                <div className="cam-name">{info.name}</div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
  );
}

export default SplideCam;
