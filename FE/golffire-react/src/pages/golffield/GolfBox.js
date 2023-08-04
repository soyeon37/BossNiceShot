import React from "react";

function GolfBox({ name, address, callNumber }) {
  return (
    <div className="GolfBox">
      <div className="golfbox-name">{name}</div>
      <div className="golfbox-add">{address ? address : '등록된 주소가 없습니다.'}</div>
      <div className="golfbox-call">{callNumber}</div>
    </div>
  );
}

export default GolfBox;
