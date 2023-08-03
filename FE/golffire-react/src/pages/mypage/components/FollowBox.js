import React from "react";

import ProfilePic from "../../../assets/source/imgs/favicon.png";

function FollowBox({ id, pic, name, level, tee }) {
    // console.log("id: ", id);
    // console.log("pic: ", pic);
    // console.log("name: ", name);
    // console.log("level: ", level);
    // console.log("tee: ", tee);

    // const teeName = {
    //     red: "레드 티 박스",
    //     white: "화이트 티 박스",
    //     black: "블랙 티 박스",
    //     default: "티입니다"
    // }

    // level 기반으로 레벨 값 저장 추 출력
    // const levelName = {
    //     "E": "이글 플레이어",
    //     "B": "버디 플레이어",
    //     "P": "파 플레이어",
    //     "b": "보기 플레이어",
    //     "D": "더블 플레이어",
    // }

    return (
        <div className="FollowBox">
            <div className="followbox-header">
                <div className="followbox-pic">
                    <img className="pic-circle" src={pic} alt={name + `님의 프로필`} />
                </div>
            </div>
            <div className="followbox-body">
                <div className="followbox-name">
                    {name}
                </div>
                <div className="followbox-info">
                    <div className="level badge">{level}</div>
                    {/* {levelName} */} 레벨 명 (ㅁㅁ 플레이어)
                </div>
                <div className="followbox-info">
                    <img className="tee badge" src={tee} alt={`티 박스`}></img>
                    {/* {teeName} */} 티 박스 명 (ㅁㅁ 티 박스)
                </div>
            </div>
        </div >
    );
}

export default FollowBox;
