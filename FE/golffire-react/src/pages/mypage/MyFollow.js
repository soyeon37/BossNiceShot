import React from "react";
import MyPageNavbar from "./MyPageNavbar";

import TeeRed from "../../assets/source/icons/flag-red.png";
import TeeWhite from "../../assets/source/icons/flag-white.png";
import TeeBlack from "../../assets/source/icons/flag-black.png";
import TeeAll from "../../assets/source/icons/flag-all.png";

import FollowBox from "./components/FollowBox";
import "./MyPage.css";

function MyFollow() {
    // 친구 목록 데이터
    const followees = [
        {
            id: 1,
            pic: "tiger",
            name: "문싸피",
            level: "B",
            tee: "red"
        }, {
            id: 2,
            pic: "tiger",
            name: "함싸피",
            level: "E",
            tee: "white"
        }, {
            id: 3,
            pic: "tiger",
            name: "김싸피",
            level: "B",
            tee: "red"
        },
    ]

    const teeMap = {
        red: TeeRed,
        white: TeeWhite,
        black: TeeBlack,
        all: TeeAll,
    }

    const handleFolloweeClick = (e) => {

    }

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyFollow" className="mypage-area">
                    <div id="myfollow-title">
                        친구 목록
                    </div>
                    <div id="myfollow-list">
                        {followees.map((followee) => (
                            <div
                                className="myfollow-box"
                                key={followee.id}
                                onClick={() => handleFolloweeClick(followee.id)}>
                                <FollowBox
                                    id={followee.id}
                                    pic={followee.pic}
                                    name={followee.name}
                                    level={followee.level}
                                    tee={teeMap[followee.tee]}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyFollow;
