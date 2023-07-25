import React from "react";

function PartLearning({ type, title, detail, name, member }) {
  return (
    <div className="learn-info">
      <div className="learn-title">
        <div className="learn-type">{type}</div>
        <div className="learn-title-text">{title}</div>
      </div>
      <div className="learn-detail">{detail}</div>
      <div className="learn-name">{name}</div>
      <div className="learn-member">{member}</div>
    </div>
  );
}

export default PartLearning;
