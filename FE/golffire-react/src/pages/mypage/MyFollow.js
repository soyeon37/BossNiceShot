import React from "react";
import MyPageNavbar from "./MyPageNavbar";
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

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyFollow" className="mypage-area">
                    <div id="myfollow-title">
                        친구 목록
                    </div>
                    <div id="myfollow-list">
                        친구 친구 친구힝
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyFollow;
