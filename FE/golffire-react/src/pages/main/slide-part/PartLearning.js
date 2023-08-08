import React from "react";

function PartLearning({ type, title, name }) {
  return (
    <div className="learn-info">
      <div className="learn-title">
        {type === "코칭" ?
          (
            <div className="learn-type badge-coach">{type}</div>
          ) : (
            <div className="learn-type badge-learn">{type}</div>
          )
        }
        <div className="learn-title-text">{title}</div>
      </div>
      <div className="learn-name">{name}</div>
    </div >
  );
}

export default PartLearning;
