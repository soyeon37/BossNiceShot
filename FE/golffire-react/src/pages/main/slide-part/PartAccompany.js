import React from "react";

function PartAccompany({ title, golf_num, date }) {
  return (
    <div className="acc-info">
      <div className="acc-title">{title}</div>
      <div className="acc-address">{golf_num}</div>
      <div className="acc-date">{date}</div>
    </div>
  );
}

export default PartAccompany;
