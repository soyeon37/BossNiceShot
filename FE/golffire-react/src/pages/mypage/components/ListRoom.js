import React from "react";

import { getNameById } from "../../golffield/ParseGolfId";
import flagred from "../../../assets/source/icons/flag-red.png";
import flagwhite from "../../../assets/source/icons/flag-white.png";
import flagblack from "../../../assets/source/icons/flag-black.png";
import flagall from "../../../assets/source/icons/flag-all.png";

function ListRoom({ title, teeBox, field, teeUpTime }) {
    // 이미지 파일 경로를 객체로 관리
    const teeMap = {
        RED: flagred,
        WHITE: flagwhite,
        BLACK: flagblack,
        NONE: flagall,
    };

    return (
        <div className="ListRoom">
            <div className="listroom-header">
                <div className="listroom-title">{title}</div>
                <img className="listroom-tee" src={teeMap[teeBox]} alt={`tee`} />
            </div>
            <div className="listroom-data">
                <div>{getNameById(field)}</div>
                <div>{teeUpTime}</div>
            </div>
        </div>
    );
}

export default ListRoom;
