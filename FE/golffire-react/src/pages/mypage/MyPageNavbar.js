import React from "react";

import { NavLink, Navigate } from "react-router-dom"

function MyPageNavbar() {
    return (
        <div id="MyPageNavbar">
            <nav className="my-nav">
                이거는 내비바
                <li>
                    <NavLink to="/mypage" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>나의 정보</NavLink>
                </li>
                
                <li>
                    <NavLink to="/mypage/editprofile" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>정보 수정</NavLink>
                </li>
                
                <li>
                    <NavLink to="/mypage/editpassword" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>비밀번호 변경</NavLink>
                </li>
                
                <li>
                    <NavLink to="/mypage/signout" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>탈퇴하기</NavLink>
                </li>
                
            </nav>
        </div>
    );
}

export default MyPageNavbar;
