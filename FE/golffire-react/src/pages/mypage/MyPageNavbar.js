import { color } from "framer-motion";

import React from "react";

import { NavLink, Navigate } from "react-router-dom"

function MyPageNavbar() {
    return (
        <div id="MyPageNavbar">
            <nav className="my-nav">
                <div className="nav-title">
                    마이페이지
                </div>
                <div className="nav-user">

                    <div className="user-photo">
                        <div style={{ width: "100px", height: "100px", borderRadius: "50px", backgroundColor: "red" }}></div>
                    </div>
                    <div className="user-name">
                        <div className="user-level">B 배찌</div>
                        <div className="user-name">김싸피</div>
                    </div>
                </div>
                <li>
                    <NavLink to="/mypage">내 정보</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/myaccompany">동행</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/mychat">채팅</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/myfollow">팔로우</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/signout">탈퇴하기</NavLink>
                </li>

            </nav>
        </div>
    );
}

export default MyPageNavbar;
