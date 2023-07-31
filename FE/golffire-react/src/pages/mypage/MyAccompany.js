import React from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";

function MyAccompany() {
    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="MyAccompany">
                <div id="myacc-title">
                    나의 동행
                </div>
                <div id="myacc-toggle">
                    모집/신청
                </div>
                <div id="myacc-list">
                    여기에 리스트 형식으로 보임
                </div>
            </div>
        </div >
    );
}

export default MyAccompany;
