import React from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";

function MyChat() {
    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="MyChat">
                <div id="mychat-title">
                    나의 채팅
                </div>
            </div>
        </div >
    );
}

export default MyChat;
