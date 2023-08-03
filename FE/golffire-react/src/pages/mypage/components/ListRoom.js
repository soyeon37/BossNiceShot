import React from "react";

function ListRoom({ title, tee, field, date }) {

    return (
        <div className="ListRoom">
            <div className="listroom-header">
                <div className="listroom-title">{title}</div>
                <img className="listroom-tee" src={tee} alt={`tee image`} />
            </div>
            <div className="listroom-data">
                <div>{field}</div>
                <div>{date}</div>
            </div>
        </div>
    );
}

export default ListRoom;
