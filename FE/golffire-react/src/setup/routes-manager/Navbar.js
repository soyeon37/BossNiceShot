import React, { useState, useEffect } from "react"
import { useCookies } from 'react-cookie';

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
import { IoMdContact } from 'react-icons/io'
import { NavLink } from "react-router-dom"

function Navbar() {
    const [isActive, setIsActive] = useState(false);

    // cookie의 user 정보 확인
    const [cookies] = useCookies(['user']);
    // 로그인 여부를 나타내는 변수, false로 초기화
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 여부를 확인하여 true로 바꾸는 함수
    useEffect(() => {
        // 로그인 정보가 있다면 true, 없다면 false로 만드는 코드
        setIsLoggedIn(!!cookies.user);
        // 추후 서버로 token 정보를 보내 유효한지 확인한 뒤 true로 만들기
    }, [cookies]);

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
                    <NavLink to="/learning" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>코칭/러닝</NavLink>
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
                        <MenuButton as={IconButton} icon={<IoMdContact fontSize="30px" />} />
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
                                <MenuItem>친구/채팅</MenuItem>
                                <MenuDivider />
                                <MenuItem style={{ color: "gray" }}>로그아웃</MenuItem>
                            </MenuGroup>
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
            </ul>
        </nav>
    );
};

export default Navbar;
