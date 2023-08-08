import { color } from "framer-motion";
import React from "react"
import "./MyPage.css";
import profileIMGn from "../../assets/source/imgs/favicon.png";

import { NavLink, Navigate } from "react-router-dom"
import { background } from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { red } from "@mui/material/colors";
import { IoGolfOutline } from "react-icons/io5";
import { BsChatDots, BsFillTrashFill } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";

function MyPageNavbar() {
    return (
        <div id="MyPageNavbar">
            <nav className="my-nav">
                <div className="nav-title">
                    마이페이지
                </div>
                <div className="nav-user">

                    <div className="user-photo">
                        <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "#FFE000", margin: "0 auto", border: "2px solid black" }}>
                        <img src={profileIMGn}></img>
                        </div>
                    </div>
                    <div className="user-title">
                        <div className="user-level">B 배찌</div>
                        <div className="user-name">김싸피</div>
                    </div>
                </div>
                <div className="nav-list">

                    <li>
                        <NavLink to="/mypage/info"
                            className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")}
                        >
                            <div className="nav-icon"><InfoOutlineIcon/></div>
                            <div>내 정보</div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/myaccompany"
                            className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")}
                        >
                            <div  className="nav-icon"><IoGolfOutline/></div>
                            <div>동행</div>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/mychat" className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")}><div  className="nav-icon"><BsChatDots/></div>
                            <div>채팅</div></NavLink>
                    </li>

                    <li>
                        <NavLink to="/mypage/myfollow" className={({ isActive }) => (isActive ? "active-link" : "nav-list-text")}><div  className="nav-icon"><MdPeopleOutline/></div>
                            <div>팔로우</div></NavLink>
                    </li>

                    <li >
                        <NavLink to="/mypage/signout" className={({ isActive }) => (isActive ? "active-link-signout" : "nav-list-text-signout")}><div  className="nav-icon"><BsFillTrashFill/></div>
                            <div>탈퇴하기</div></NavLink>
                    </li>
                </div>

            </nav>
        </div>
    );
}

export default MyPageNavbar;
