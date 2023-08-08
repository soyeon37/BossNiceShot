import React from "react";

function PartAccompany({ title, golf_place, date }) {
  console.log("내가 받은 정보? ", title, golf_place, date);
  
  return (
    <div className="acc-info">
      <div className="acc-title">{title}</div>
      <div className="acc-place">{golf_place}</div>
      <div className="acc-date">{date}</div>
    </div>
  );
}

export default PartAccompany;
