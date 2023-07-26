import React from "react";
import golfball from "../../assets/source/imgs/golfball.jpg";

function GolfBox({ name, address, call }) {
  return (
    <div className="GolfBox" style={{ height: "", width: "100%" }}>
      <div className="golf-info">
        <div className="golf-name">{name}</div>
        <div className="golf-add">{address}</div>
        <div className="golf-call">{call}</div>
      </div>
    </div>
  );
}

export default GolfBox;
