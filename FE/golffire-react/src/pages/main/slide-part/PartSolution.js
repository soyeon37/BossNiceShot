import React from "react";

function PartSolution({ img }) {
  return (
    <div className="sol-info">
        <div className="sol-img">
            <img src={img}></img>
        </div>
    </div>
  );
}

export default PartSolution;
