import React from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";

import { NavLink, useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const moveEditProfile = () => {
        navigate("/mypage/editprofile/");
    }
    const moveEditPassword = () => {
        navigate("/mypage/editpassword");
    }

    return (
        <div id="MyPage">
            <MyPageNavbar />
            <div id="Profile">
                <div id="profile-info">
                    <div id="info-pic">(커다란 캐릭터 사진)</div>
                    <div id="info-text">
                        <div id="info-email">이메일</div>
                        <div id="info-nickname">닉네임</div>
                        <div id="info-introduction">자기소개</div>
                        <div id="info-golf-info1">
                            <div id="info-golf-info1-1">
                                최고타수
                            </div>
                            <div id="info-golf-info1-2">
                                평균타수
                            </div>
                        </div>
                        <div id="info-golf-info2">
                            <div id="info-golf-info2-1">
                                레벨
                            </div>
                            <div id="info-golf-info2-2">
                                선호 티박스
                            </div>
                        </div>
                    </div>
                    <div id="info-edit">
                        <button onClick={moveEditProfile}>정보 수정</button>
                        <button onClick={moveEditPassword}>비밀번호 변경</button>
                    </div>
                </div>
                <div id="profile-history">
                    <div id="history-title">나의 스코어</div>
                    <div id="history-list">스코어 리스트(component 사용 예정)</div>
                </div>
            </div>
        </div >
    );
}

export default Profile;
