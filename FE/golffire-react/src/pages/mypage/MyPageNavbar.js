import React, { useState, useEffect } from "react"
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";

import { getImage, getBackground } from "../../setup/error-manager/ParseProfile";

import { NavLink, Navigate } from "react-router-dom"
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { IoGolfOutline } from "react-icons/io5";
import { BsChatDots, BsFillTrashFill } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";

import "./MyPage.css";

function MyPageNavbar() {
    const state = useSelector((state) => state.userInfoFeature);

    // 사용자 정보
    const [userId, setUserId] = useState(state.userId);
    const [userNickname, setUserNickname] = useState(state.userNickname);
    const [userLevel, setUserLevel] = useState(state.userLevel);
    const [userTee, setUserTee] = useState(state.userTee);
    const [userProfile, setUserProfile] = useState(state.userProfile);

    // AccessToken
    const userAccessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userAccessToken}`;

    // 사용자 정보 재호출
    useEffect(() => {
        // axios code
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/info";
        axios.get(apiUrl)
            .then(response => {
                console.log("성공, ", response)
                // 사용자 정보 저장 필요
                setUserProfile(response.data.data.image);
            })
            .catch(error => {
                console.error('error 발생: ', error);
            });

        // TEST CODE // Debug Code !!!
        const testProfile = {
            nickname: "문싸피",
            teeBox: "RED",
            topScore: 40,
            averageScore: 80,
            level: "보기 플레이어",
            image: "green_suncap_tiger white",
            introduce: "안녕하세요. 제 이름은 문싸피, 반가워요.",
        }
        // setUserProfile(testProfile.image);
        if (!userProfile) setUserProfile("green_suncap_tiger white");
    }, []);

    // 사진 출력을 위한 변수
    let profileValues = "";
    if (userProfile) profileValues = userProfile.split(' ');
    console.log('userProfile: ', userProfile);

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
                            style={{ backgroundColor: getBackground(userProfile) }}>
                            {profileValues[0] ? (
                                <img className="info-pic-image"
                                    src={require(`../../assets/source/profile/${getImage(userProfile)}.png`)} />
                            ) : (
                                <img className="info-pic-image"
                                    src={require(`../../assets/source/profile/green_suncap_tiger.png`)} />
                            )}
                        </div>
                    </div>
                    <div className="user-title">
                        <div className="user-level">
                            {userLevel}
                            {/* 배지 필요 */}
                        </div>
                        <div className="user-name">
                            {userNickname}
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
