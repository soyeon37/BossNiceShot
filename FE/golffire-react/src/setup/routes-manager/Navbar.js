import React from "react"
import "./styles.css"
import { Icon } from '@chakra-ui/icons'
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
                <li>
                    <NavLink to="/community/" style={({ isActive, isPending }) => {
                        return {
                            fontWeight: isActive ? "bold" : "",
                        };
                    }}>커뮤니티</NavLink>
                </li>
                <li className="mypagemenu">
                    <Menu>
                        <MenuButton as={IconButton} icon={<IoMdContact fontSize="30px" />} />
                        <MenuList>
                            <MenuGroup title='프로필'>
                                <MenuItem>마이페이지</MenuItem>
                                <MenuItem>친구/채팅</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Help'>
                                <MenuItem>자주묻는질문</MenuItem>
                                <MenuItem>문의사항</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
