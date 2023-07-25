import React from "react";

function PartAccompany({ user_name, title, address, member_num, deadline }) {
  return (
    <div className="acc-info">
      <div className="acc-title">{title} </div>
      <div className="acc-detail">
        <div className="acc-detail-box">
          <div className="acc-detail-left">{address}</div>
          <div className="acc-detail-right">{member_num}</div>
        </div>
        <div className="acc-detail-box">
          <div className="acc-detail-left">{user_name}</div>
          <div className="acc-detail-right">{deadline}</div>
        </div>
      </div>
    </div>
  );
}

export default PartAccompany;
