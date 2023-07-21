import React from "react";

function PartGolf({ name, address }) {
  return (
    <div className="golf-info">
      <div className="golf-name">
        {name}
      </div>
      <div className="golf-add">
        {address}</div>
    </div>
  );
}

export default PartGolf;
