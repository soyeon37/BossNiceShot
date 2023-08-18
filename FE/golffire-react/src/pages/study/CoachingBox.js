import React from "react";

import { getAble, getImage, getBackground } from "../../setup/error-manager/ParseProfile";
import ProfileImg from "../../assets/source/imgs/favicon.png";
import { MdSportsGolf } from "react-icons/md";
import { BsFillPersonFill } from 'react-icons/bs';

function CoachingBox({ index, id, title, reservedTime, capacity, studyUserCount, memberNickname, memberImage, handleSelectButtonClick, dateFormat }) {
    return (
        <div className="coaching-box" onClick={() => handleSelectButtonClick(id, index)}>
            <div className="coaching-box-title">
                {title}
            </div>

            <div className="box-author-position">
                <div className="box-author">
                    {getAble(memberImage) ? (
                        <img className="box-profile-icon" alt={`&{author}님`}
                            src={require(`../../assets/source/profile/${getImage(memberImage)}.png`)} />
                    ) : (
                        <img className="box-profile-icon" alt={`&{author}님`}
                            src={require(`../../assets/source/profile/green_suncap_tiger.png`)} />
                    )}
                    {memberNickname}
                </div>
            </div>

            <div className="coaching-box-date">
                <MdSportsGolf className="react-icon" />
                {dateFormat(reservedTime)}
            </div>

            <div className="coaching-box-user-count">
                <BsFillPersonFill className="react-icon" color="grey" />
                {studyUserCount} / {capacity}
            </div>

            <div className="coaching-box-button-position">
                <div className="coaching-box-button" onClick={() => handleSelectButtonClick(id, index)}>
                    자세히 보기
                </div></div>
        </div >
    );
}

export default CoachingBox;
