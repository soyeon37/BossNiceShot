import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "./MyPage.css";

// Redux
import { useSelector } from "react-redux";

import MyPageNavbar from "./MyPageNavbar";
import { getImage, getBackground } from "../../setup/error-manager/ParseProfile";

function Profile() {
    const navigate = useNavigate();
    const state = useSelector((state) => state.userInfoFeature);

    // 사용자 정보
    const [userId, setUserId] = useState(state.userId);
    const [userNickname, setUserNickname] = useState(state.userNickname);
    const [userIntroduce, setUserIntroduce] = useState("");
    const [userTopScore, setUserTopScore] = useState("");
    const [userAverageScore, setUserAverageScore] = useState("");
    const [userLevel, setUserLevel] = useState(state.userLevel);
    const [userTee, setUserTee] = useState(state.userTee);
    const [userProfile, setUserProfile] = useState(state.userProfile);

    // AccessToken
    const userAccessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userAccessToken}`;

    // 사용자 정보 (서버로 부터 받은 userId 기반 정보)
    const [personInfo, setPersonInfo] = useState(null);
    const [scoreHistory, setScoreHistory] = useState(null);

    // 사용자 정보 재호출
    useEffect(() => {
        // axios code
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/info";
        axios.get(apiUrl)
            .then(response => {
                console.log("성공, ", response)
                // 사용자 정보 저장 필요

                setUserProfile(response.data.data.image);
                // 자기소개
            })
            .catch(error => {
                console.error('error 발생: ', error);
            });
    }, []);

    // 정보 수정 & 비밀번호 수정 route
    const moveEditProfile = () => {
        navigate("/mypage/info/editprofile/");
    }
    const moveEditPassword = () => {
        navigate("/mypage/info/editpassword");
    }

    // TEST DATA // Debug Code !!!
    // const testProfile = {
    //     nickname: "문싸피",
    //     teeBox: "RED",
    //     topScore: 40,
    //     averageScore: 80,
    //     level: "보기 플레이어",
    //     image: "green_suncap_tiger white",
    //     introduce: "안녕하세요. 제 이름은 문싸피, 반가워요.",
    // }

    const testHistory = [
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
        }, {
            place: "드림스크린", date: "2023-02-03", score: 60
        }, {
            place: "드림스크린", date: "2023-02-03", score: 60
        }, {
            place: "드림스크린", date: "2023-02-03", score: 60
        }, {
            place: "드림스크린", date: "2023-02-03", score: 60
        },
    ]

    // 사진 배경 색상을 map으로 관리
    const colorMap = {
        "red": "#F24141",
        "yellow": "#FFE000",
        "green": "#3BD641",
        "blue": "#80CAFF",
        "white": "#FFFFFF",
    }

    // 일시 변환 함수
    const dateFormat = (input) => {
        const date = new Date(input);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
    };

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />

                <div id="Profile">
                    <div id="profile-title">내 정보</div>
                    <div id="profile-text">
                        <div id="profile-info">
                            <div id="info-pic-wrapper"
                                style={{ backgroundColor: getBackground(userProfile) }}>
                                <img className="info-pic-image"
                                    src={require(`../../assets/source/profile/${getImage(userProfile)}.png`)} />
                            </div>
                            <div id="info-text">
                                <div id="info-header">이메일</div>
                                <div id="info-email">{userId}</div>
                                <div id="info-header">닉네임</div>
                                <div id="info-nickname">{userNickname}</div>
                                <div id="info-header">자기소개</div>
                                <div id="info-introduction">{userIntroduce}</div>
                                <div id="info-golf-info1">
                                    <div id="info-golf-info1-1-div">
                                        <div id="info-header">최고타수</div>
                                        <div id="info-golf-info1-1">{userTopScore}</div>
                                    </div>
                                    <div id="info-golf-info1-2-div">
                                        <div id="info-golf-info-header">평균타수</div>
                                        <div id="info-golf-info1-2">{userAverageScore}</div>
                                    </div>
                                </div>
                                <div id="info-golf-info2">
                                    <div id="info-golf-info2-1-div">
                                        <div id="info-header">레벨</div>
                                        <div id="info-golf-info2-1">{userLevel}</div>
                                    </div>
                                    <div id="info-golf-info2-2-div">
                                        <div id="info-golf-info-header">선호 티박스</div>
                                        <div id="info-golf-info2-2">{userTee}</div>
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
                            <div id="history-title">{userNickname}의 스코어</div>
                            <div id="history-list">
                                {testHistory.map((history, index) => (
                                    <div className="HistoryBox" key={index}>
                                        <div className="history-place">{history.place}</div>
                                        <div className="history-date">{dateFormat(history.date)}</div>
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
