import React from "react";
import MyPageNavbar from "./MyPageNavbar";

import "./MyPage.css";

import { NavLink, useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const moveEditProfile = () => {
        navigate("/mypage/info/editprofile/");
    }
    const moveEditPassword = () => {
        navigate("/mypage/info/editpassword");
    }
    const personInfo = {
        name: "문싸피",
        backcolor: "#FF7272",
        profilepic: "value from server but never use",
        introduce: "안녕하세요. 제 이름은 문싸피, 반가워요.",
        hitBest: 80,
        hitAvg: 80,
        level: "B",
        tee: "red"
    }

    const scoreHistory = [
        {
            place: "랄라골프장", date: "2023-08-03", score: 80
        }, {
            place: "해피골프장", date: "2023-08-01", score: 80
        }, {
            place: "꿈 꾸는 필드 - 상암점", date: "2023-07-03", score: 80
        }, {
            place: "해피스크린", date: "2023-06-03", score: 80
        }, {
            place: "샷샷샷", date: "2023-05-03", score: 80
        }, {
            place: "드림스크린", date: "2023-02-03", score: 60
        },
        {
            place: "드림스크린", date: "2023-02-03", score: 60
        },
        {
            place: "드림스크린", date: "2023-02-03", score: 60
        },
        {
            place: "드림스크린", date: "2023-02-03", score: 60
        },
        {
            place: "드림스크린", date: "2023-02-03", score: 60
        },
    ]
    const handleSaveScore = (index) => {
        // 동행 기록에 score 저장 axios
    }

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />


                <div id="Profile">
                    <div id="profile-title">내 정보</div>
                    <div id="profile-text">
                        <div id="profile-info">
                            <div id="info-pic-wrapper">
                                <div id="info-pic">
                                (커다란 캐릭터 사진)
                                </div>
                            </div>
                            <div id="info-text">
                                <div id="info-header">
                                    이메일
                                </div>
                                <div id="info-email">
                                    ssafy1234@ssafy.com
                                </div>
                                <div id="info-header">
                                    닉네임
                                </div>
                                <div id="info-nickname">닉네임</div>
                                <div id="info-header">
                                    자기소개
                                </div>
                                <div id="info-introduction">자기소개
                                </div>
                                <div id="info-golf-info1">
                                    <div id="info-golf-info1-1-div">
                                        <div id="info-header">
                                            최고타수
                                        </div>
                                        <div id="info-golf-info1-1">
                                            최고타수
                                        </div>
                                    </div>
                                    <div id="info-golf-info1-2-div">
                                        <div id="info-golf-info-header">
                                            평균타수
                                        </div>
                                        <div id="info-golf-info1-2">
                                            평균타수
                                        </div>
                                    </div>
                                </div>
                                <div id="info-golf-info2">
                                    <div id="info-golf-info2-1-div">

                                        <div id="info-header">
                                            레벨
                                        </div>
                                        <div id="info-golf-info2-1">
                                            레벨
                                        </div>
                                    </div>
                                    <div id="info-golf-info2-2-div">

                                        <div id="info-golf-info-header">
                                            선호 티박스
                                        </div>
                                        <div id="info-golf-info2-2">
                                            선호 티박스
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="info-edit">
                                <div id="info-edit-profile">
                                    <button id="info-edit-button" onClick={moveEditProfile}>정보수정</button>
                                </div>
                                <div id="info-edit-password">
                                    <button id="info-edit-button" onClick={moveEditPassword}>비밀번호 변경</button>
                                </div>
                            </div>
                        </div>
                        <div id="profile-history">
                            <div id="history-title">{personInfo.name}의 스코어</div>
                            <div id="history-list">
                                {scoreHistory.map((history, index) => (
                                    <div className="HistoryBox" key={index}>
                                        <div className="history-info">
                                            <div className="history-place">{history.place}</div>
                                            <div className="history-date">{history.date}</div>
                                        </div>
                                        <button className="history-score" onClick={() => handleSaveScore(index)}>{history.score} 타</button>
                                    </div >
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Profile;
