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


function Navbar() {
  return (
    <nav className="nav">
        <a href="/" className="site-title">
            골프파이어
        </a>
        <ul>        
            <li>
                <a href="/solution/">솔루션</a>
            </li>
            <li>
                <a href="/learning/">코칭/러닝</a>
            </li>
            <li>
                <a href="/golffield/">골프장</a>
            </li>
            <li>
                <a href="/accompany/">동행</a>
            </li>
            <li>
                <a href="/community/">커뮤니티</a>
            </li>
            <li className="mypagemenu">
                <Menu>
                    <MenuButton as={IconButton} icon={<IoMdContact fontSize="30px"/>}/>
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
