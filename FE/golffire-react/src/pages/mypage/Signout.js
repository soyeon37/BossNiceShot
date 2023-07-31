import React from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";
import CryImg from "../../assets/source/mascot/mascot-cry-2.png";

function Signout() {
    const handleSignout = (e) => {
        console.log("탈퇴하기");
    };

    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="Signout">
                <div id="signout-box">
                    <div id="signout-title">
                        탈퇴하기
                    </div>
                    <div id="signout-reason">
                        <div id="reason-radio">
                            탈퇴 사유를 알려주세요.
                        </div>
                        <div id="reason-pic">
                            <img src={CryImg} />
                        </div>
                    </div>
                    <div id="signout-notice">
                        탈퇴하시면 다시 가입 못해요 ~~ 안내문
                    </div>
                    <button id="signout-button" onClick={handleSignout}>
                        탈퇴하기
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Signout;
