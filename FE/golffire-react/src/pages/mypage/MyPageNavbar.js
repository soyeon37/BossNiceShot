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
                        (사진 공간)
                    </div>
                    <div className="user-name">
                        <div className="user-level">B 배찌</div>
                        <div className="user-name">김싸피</div>
                    </div>
                </div>
                <li>
                    <NavLink to="/mypage">나의 정보</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/myaccompany">나의 동행</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/editprofile">정보 수정</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/editpassword">비밀번호 변경</NavLink>
                </li>

                <li>
                    <NavLink to="/mypage/signout">탈퇴하기</NavLink>
                </li>

            </nav>
        </div>
    );
}

export default MyPageNavbar;
