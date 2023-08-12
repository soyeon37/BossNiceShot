import React, { useState } from "react";

import parseGolfId from "../golffield/ParseGolfId";
import ProfileImg from "../../assets/source/imgs/favicon.png";
import { MdSportsGolf } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

function AccompanyBox({ title, id, tee, author, placeId, date, handleJoinButtonClick }) {


    return (
        <div className="accompany-box">
            <div className="accompany-box-title">
                {title}
                <img className="tee-icon" src={tee} alt="tee-image" />
            </div>
            <div className="accompany-box-author-position">
                <div className="accompany-box-author">
                    <img className="profile-icon" src={ProfileImg} alt={`$author님`} />
                    {author}
                </div>
            </div>
            <div className="accompany-box-date">
                <MdSportsGolf className="react-icon" />
                {date}
            </div>
            <div className="accompany-box-place">
                <FaMapMarkerAlt className="react-icon" />
                {parseGolfId(placeId)}
            </div>
            <div className="accompany-box-button-position">
                <div className="accompany-box-button" onClick={() => handleJoinButtonClick(id)}>
                    자세히 보기
                </div></div>
        </div >
    );
}

export default AccompanyBox;
