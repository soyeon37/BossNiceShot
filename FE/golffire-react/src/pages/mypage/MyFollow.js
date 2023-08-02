import React from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";

function MyFollow() {
    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="MyFollow">
                <div id="myfollow-title">
                    나의 팔로우
                </div>
            </div>
        </div >
    );
}

export default MyFollow;
