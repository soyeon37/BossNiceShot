import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
import axios from 'axios';

import AlertPage from "./alert/AlertPage";

import { IoMdContact } from 'react-icons/io'
import { Avatar, AvatarBadge, AvatarGroup, Hide } from '@chakra-ui/react'

import "./styles.css"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    forwardRef,
    IconButton
} from '@chakra-ui/react'

function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    // cookie의 user 정보 확인
    const [cookies, setCookie] = useCookies(['refreshToken']);

    // 로그인 여부를 나타내는 변수, false로 초기화
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 여부를 확인하여 true로 바꾸는 함수
    useEffect(() => {
        // 로그인 정보가 있다면 true, 없다면 false로 만드는 코드
        setIsLoggedIn(!!cookies.user);
        // 추후 서버로 token 정보를 보내 유효한지 확인한 뒤 true로 만들기
    }, [cookies]);

    const handleLogout = () => {
        console.log('cookies.refreshToken:', cookies.refreshToken);

        const apiUrl = 'http://localhost:8080/members/logout'
        const data = {
            refreshToken: cookies.refreshToken
        }
        axios.post(apiUrl, data)
            .then(response => {
                console.log(response);
                if (response.data.data === "SUCCESS") {
                    setCookie('refreshToken', cookies.refreshToken, { path: '/', maxAge: 0 });
                    navigate('/');
                } else {
                    alert('Error')
                }
            })
    };

    return (
        <nav className="nav">
            <a href="/" className="site-title">
                골프파이어
            </a>
            <ul>
                <li>
                    <NavLink to="/solution" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>솔루션</NavLink>
                </li>
                <li>
                    <NavLink to="/studylist" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>스터디</NavLink>
                </li>
                <li>
                    <NavLink to="/golffield" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>골프장</NavLink>
                </li>
                <li>
                    <NavLink to="/accompany/" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>동행</NavLink>
                </li>
                <li className="communitymenu">
                    <Menu>
                        <MenuButton as={Button} variant="unstyled" fontWeight={isActive ? "bold" : ""}>
                            커뮤니티
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <NavLink to="/community/" style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                    };
                                }}>커뮤니티</NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink to="/noticelist/" style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                    };
                                }}>공지사항</NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink to="/inquirylist/" style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                    };
                                }}>문의사항</NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink to="/freeboardlist/" style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                    };
                                }}>자유게시판</NavLink>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </li>
                <li className="mypagemenu">
                    <Menu>

                        {/* 마이페이지 버튼 아바타로 수정했습니다. */}
                        <MenuButton>
                            <Avatar size={"sm"}>
                                {/* 여기서 bg 값을 알람이 있을때는 빨간색, 없을때는 초록색으로 변경해야 할듯, 그런데 badge클릭시 알림창 뜨게 하는게 생각보다 쉽지 않음  */}
                                <AvatarBadge boxSize={'1.25rem'} bg={'red'}>
                                    {/* <AlertPage></AlertPage> */}
                                </AvatarBadge>
                            </Avatar>
                        </MenuButton>
                        <MenuList>

                            {/* test code - will delete */}
                            <MenuGroup title=''>
                                <MenuItem>
                                    <NavLink to="/mypage/" style={({ isActive, isPending }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                        };
                                    }}>
                                        마이페이지
                                    </NavLink>
                                </MenuItem>
                                <MenuItem style={{ color: "gray" }} onClick={handleLogout}>
                                    로그아웃
                                </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            {/* test code end */}

                            {isLoggedIn ? (
                                <MenuGroup title=''>
                                    <MenuItem>
                                        <NavLink to="/mypage/" style={({ isActive, isPending }) => {
                                            return {
                                                fontWeight: isActive ? "bold" : "",
                                            };
                                        }}>
                                            마이페이지
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem>친구/채팅</MenuItem>
                                    <MenuDivider />
                                    <MenuItem style={{ color: "gray" }}>로그아웃</MenuItem>
                                </MenuGroup>
                            ) : (<MenuGroup title=''>
                                <MenuItem>
                                    <NavLink to="/login/" style={({ isActive, isPending }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                        };
                                    }}>
                                        로그인
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <NavLink to="/signup/" style={({ isActive, isPending }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                        };
                                    }}>
                                        회원가입
                                    </NavLink>
                                </MenuItem>
                            </MenuGroup>)}
                        </MenuList>
                    </Menu>
                </li>
                <li>
                    <AlertPage />
                </li>
            </ul>
        </nav >
    );
};

export default Navbar;
