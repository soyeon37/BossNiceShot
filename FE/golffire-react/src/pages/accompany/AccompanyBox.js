import React, { useState } from "react";

import ProfileImg from "../../assets/source/imgs/favicon.png";
import { MdSportsGolf } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

function AccompanyBox({ title, id, tee, author, place, date, handleSelectButtonClick, dateFormat }) {
    return (
        <div className="accompany-box" onClick={() => handleSelectButtonClick(id)}>
            <div className="accompany-box-title">
                {title}
                <img className="tee-icon" src={tee} alt="tee-image" />
            </div>
            <div className="box-author-position">
                <div className="box-author">
                    <img className="profile-icon" src={ProfileImg} alt={`$author님`} />
                    {author}
                </div>
            </div>
            <div className="accompany-box-date">
                <MdSportsGolf className="react-icon" />
                {dateFormat(date)}
            </div>
            <div className="accompany-box-place">
                <FaMapMarkerAlt className="react-icon" color="red" />
                {place}
            </div>
            <div className="accompany-box-button-position">
                <div className="accompany-box-button" onClick={() => handleSelectButtonClick(id)}>
                    자세히 보기
                </div></div>
        </div >
    );
}

export default AccompanyBox;
