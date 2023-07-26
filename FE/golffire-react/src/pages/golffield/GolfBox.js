import React from "react";
import golfball from "../../assets/source/imgs/golfball.jpg";

function GolfBox({ name, address, call }) {
    return (
        <div className="GolfBox" style={{ height: "500px", width: "300px" }}>
            <div className="golf-pic">
                <img
                    src={golfball}
                    alt="banner-golf-icon"
                />
            </div>
            <div className="golf-info">
                <div className="golf-name">
                    {name}
                </div>
                <div className="golf-add">
                    {address}
                </div>
                <div className="golf-call">
                    {call}
                </div>
            </div>
        </div>
    );
}

export default GolfBox;
