import React from "react";

import ProfileImg from "../../assets/source/imgs/favicon.png";
import { MdSportsGolf } from "react-icons/md";
import { BsFillPersonFill } from 'react-icons/bs';

function LearningBox({ index, id, title, reservedTime, capacity, studyUserCount, memberNickname, memberImage, handleSelectButtonClick, dateFormat}) {
    return (
        <div className="coaching-box" onClick={() => handleSelectButtonClick(id, index)}>
            <div className="coaching-box-title">
                {title}
            </div>

            <div className="box-author-position">
                <div className="box-author">
                    <img className="profile-icon" src={ProfileImg} alt={`${memberNickname}님`} />
                    {memberNickname}
                </div>
            </div>

            <div className="coaching-box-date">
                <MdSportsGolf className="react-icon" />
                {dateFormat(reservedTime)}
            </div>

            <div className="coaching-box-user-count">
                <BsFillPersonFill className="react-icon" color="grey"/>
                {studyUserCount} / {capacity}
            </div>

            <div className="coaching-box-button-position">
                <div className="learning-box-button" onClick={() => handleSelectButtonClick(id, index)}>
                    자세히 보기
                </div></div>
        </div >
    );
}

export default LearningBox;
