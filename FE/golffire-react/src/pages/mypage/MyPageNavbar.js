import React from "react"
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";

import { NavLink, Navigate } from "react-router-dom"
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { IoGolfOutline } from "react-icons/io5";
import { BsChatDots, BsFillTrashFill } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";

import "./MyPage.css";

function MyPageNavbar() {

    // 사용자 정보 및 AccessToken
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const userNickname = useSelector((state) => state.userInfoFeature.userNickname);
    const userLevel = useSelector((state) => state.userInfoFeature.userLevel);
    const userTee = useSelector((state) => state.userInfoFeature.userTee);
    const userProfile = useSelector((state) => state.userInfoFeature.userImage);
    const userAccessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userAccessToken}`;

    // TEST CODE // Debug Code !!!
    const testProfile = {
        nickname: "문싸피",
        teeBox: "RED",
        topScore: 40,
        averageScore: 80,
        level: "보기 플레이어",
        image: "yellow_cap_bear yellow",
        introduce: "안녕하세요. 제 이름은 문싸피, 반가워요.",
    }
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

    // 사진 출력을 위한 변수
    let profileValues = "";
    if (testProfile.image) profileValues = testProfile.image.split(' ');

    // 사진 배경 색상을 map으로 관리
    const colorMap = {
        "red": "#F24141",
        "yellow": "#FFE000",
        "green": "#3BD641",
        "blue": "#80CAFF",
        "white": "#FFFFFF",
    }

    return (
        <div id="MyPageNavbar">
            <nav className="my-nav">
                <div className="nav-title">
                    마이페이지
                </div>
                <div className="nav-user">

                    <div className="user-photo">
                        <div id="info-pic-wrapper"
                            style={{ backgroundColor: colorMap[profileValues[1]] }}>
                            <img className="info-pic-image"
                                src={require(`../../assets/source/profile/${profileValues[0]}.png`)} />
                        </div>
                    </div>
                    <div className="user-title">
                        <div className="user-level">
                            {userLevel}
                            {/* 배지 필요 */}
                        </div>
                        <div className="user-name">
                            {testProfile.nickname}
                        </div>
                    </div>
                </div>
                <div className="nav-list">

                    <li id="nav-list-click">
                        <NavLink to="/mypage/info"
                            className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")} >
                            <div className="nav-icon"><InfoOutlineIcon /></div>
                            <div>내 정보</div>
                        </NavLink>
                    </li>

                    <li id="nav-list-click">
                        <NavLink to="/mypage/myaccompany"
                            className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")} >
                            <div className="nav-icon"><IoGolfOutline /></div>
                            <div>동행</div>
                        </NavLink>
                    </li>

                    <li id="nav-list-click">
                        <NavLink to="/mypage/mychat" className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")}><div className="nav-icon"><BsChatDots /></div>
                            <div>채팅</div></NavLink>
                    </li>

                    <li id="nav-list-click">
                        <NavLink to="/mypage/myfollow" className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")}><div className="nav-icon"><MdPeopleOutline /></div>
                            <div>팔로우</div></NavLink>
                    </li>

                    <li id="nav-list-click">
                        <NavLink to="/mypage/signout" className={({ isActive }) => (isActive ? "active-link-signout" : "nav-list-text-signout")}><div className="nav-icon"><BsFillTrashFill /></div>
                            <div>탈퇴하기</div></NavLink>
                    </li>
                </div>

            </nav>
        </div>
    );
}

export default MyPageNavbar;
