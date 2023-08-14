import React, { useState } from "react";
import MyPageNavbar from "./MyPageNavbar";

import FollowBox from "./components/FollowBox";
import ProfileModal from "./components/ProfileModal";

import TeeRed from "../../assets/source/icons/flag-red.png";
import TeeWhite from "../../assets/source/icons/flag-white.png";
import TeeBlack from "../../assets/source/icons/flag-black.png";
import TeeAll from "../../assets/source/icons/flag-all.png";
import ProfilePic from "../../assets/source/imgs/favicon.png";

import "./MyPage.css";
import "./components/ProfileModal.css";

function MyFollow() {
    const [personId, setPersonId] = useState(0);

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
        {
            id: 4,
            pic: "tiger",
            name: "김싸피",
            level: "B",
            tee: "red"
        },
        {
            id: 5,
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

    const picMap = {
        tiger: ProfilePic,
    }

    const handleSelect = (e) => {
        setPersonId(e);
        console.log("저는 ", e, "라는 사람을 선택했어요.")
    }

    const handleUnselect = () => {
        setPersonId(0);
    }

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyFollow" className="mypage-area">
                    <div id="myfollow-title">
                        친구 목록
                    </div>
                    <div id="myfollow-list-wrap">
                        <div id="myfollow-list">
                            {followees.map((followee) => (
                                <div
                                    className="myfollow-box"
                                    key={followee.id}
                                    onClick={() => handleSelect(followee.id)}>
                                    <FollowBox
                                        id={followee.id}
                                        pic={picMap[followee.pic]}
                                        name={followee.name}
                                        level={followee.level}
                                        tee={teeMap[followee.tee]}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {personId === 0 ? (
                <> </>
            ) : (
                <ProfileModal
                    id={personId}
                    pic={picMap[followees.find((followee) => followee.id === personId).pic]}
                    handleUnselect={handleUnselect} />
            )}
        </div >
    );
}

export default MyFollow;
