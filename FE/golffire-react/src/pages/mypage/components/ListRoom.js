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

    // 날짜 출력을 위한 함수
    const dateFormat = (input) => {
        const date = new Date(input);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
    };

    return (
        <div className="ListRoom">
            <div className="listroom-header">
                <div className="listroom-title">{title}</div>
                <img className="listroom-tee" src={teeMap[teeBox]} alt={`tee`} />
            </div>
            <div className="listroom-data">
                <div>{getNameById(field)}</div>
                <div>{dateFormat(teeUpTime)}</div>
            </div>
        </div>
    );
}

export default ListRoom;
