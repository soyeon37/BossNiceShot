import React, { useEffect } from "react";
import { getNameById } from "../../golffield/ParseGolfId";

function PartAccompany({ title, golf, date }) {
  return (
    <div className="acc-info">
      <div className="acc-title">{title}</div>
      <div className="acc-place">{getNameById(golf)}</div>
      <div className="acc-date">{date}</div>
    </div>
  );
}

export default PartAccompany;
