import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";

import AlertPage from "./alert/AlertPage";

import { IoMdContact } from 'react-icons/io'
import { Avatar, AvatarBadge, AvatarGroup, Hide } from "@chakra-ui/react";
import Favicon from "../../assets/source/imgs/favicon.png";
import "./styles.css";
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
  IconButton,
} from "@chakra-ui/react";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  // Redux
  const dispatch = useDispatch();
  // 사용자 정보(userId)로 로그인 여부 판단
  const userId = useSelector((state) => state.userInfoFeatrue.userId);
  const userNickname = useSelector((state) => state.userInfoFeatrue.userNickname);
  console.log("Navbar에 저장된 사용자 정보: ", userId, "&", userNickname);

  const navigate = useNavigate();

  // cookie의 user 정보 확인
  const [cookies, setCookie] = useCookies(["refreshToken"]);


  const handleLogout = () => {
      console.log('cookies.refreshToken:',cookies.refreshToken);
    
      const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/logout'
      const data = {
          refreshToken: cookies.refreshToken
      }
      axios.post(apiUrl, data)
          .then((response) => {
              console.log(response);

              if (response.data.data === "SUCCESS") {
                  setCookie('refreshToken', cookies.refreshToken, { path: '/', maxAge: 0 });

                  console.log("로그아웃하여 redux 정보 삭제");
                  dispatch(resetUserState());

                  navigate('/');
              } else {
                  alert('Error')
              }
          });
  };

  const handleCheckNotification = () => {
      const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/notification/check';
      axios.get(apiUrl)
          .then((response) => {
              if (response.data.data === false) {
                  // 새로운 알림 존재
              } else {
                  // 이미 읽은 알림들
              }
          })
          .catch((error) => {
              navigate('/');
          })
  }

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        <img className="favicon-img" src={Favicon} alt="favicon" />
        사장님, 나이스 샷
      </a>
      <ul id="nav-list">
        <li id="nav-list-li">
          <NavLink to="/solution" id="nav-list-link" style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              borderTop: isActive ? '2px solid Black' : "",
              borderLeft: isActive ? '2px solid Black' : "",
              borderRight: isActive ? '2px solid Black' : "",
              borderBottom: isActive ? '2px solid White' : "",
              borderRadius: isActive ? '20px 20px 0px 0px' : '',
              height: isActive ? ' 54px' : '',
              marginTop: isActive ? '12px' : '',
              paddingBottom: isActive ? '13px' : '',
              width: '100px'
            };
          }}>솔루션</NavLink>
        </li>
        <li id="nav-list-li">
          <NavLink to="/studylist" id="nav-list-link" style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              borderTop: isActive ? '2px solid Black' : "",
              borderLeft: isActive ? '2px solid Black' : "",
              borderRight: isActive ? '2px solid Black' : "",
              borderBottom: isActive ? '2px solid White' : "",
              borderRadius: isActive ? '20px 20px 0px 0px' : '',
              height: isActive ? ' 54px' : '',
              marginTop: isActive ? '12px' : '',
              paddingBottom: isActive ? '13px' : '',
              width: '100px'
            };
          }}>스터디</NavLink>
        </li>
        <li id="nav-list-li">
          <NavLink to="/golffield" id="nav-list-link" style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              borderTop: isActive ? '2px solid Black' : "",
              borderLeft: isActive ? '2px solid Black' : "",
              borderRight: isActive ? '2px solid Black' : "",
              borderBottom: isActive ? '2px solid White' : "",
              borderRadius: isActive ? '20px 20px 0px 0px' : '',
              height: isActive ? ' 54px' : '',
              marginTop: isActive ? '12px' : '',
              paddingBottom: isActive ? '13px' : '',
              width: '100px'
            };
          }}>골프장</NavLink>
        </li>
        <li id="nav-list-li">
          <NavLink to="/accompany/" id="nav-list-link" style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              borderTop: isActive ? '2px solid Black' : "",
              borderLeft: isActive ? '2px solid Black' : "",
              borderRight: isActive ? '2px solid Black' : "",
              borderBottom: isActive ? '2px solid White' : "",
              borderRadius: isActive ? '20px 20px 0px 0px' : '',
              height: isActive ? ' 54px' : '',
              marginTop: isActive ? '12px' : '',
              paddingBottom: isActive ? '13px' : '',
              width: '100px'
            };
          }}>동행</NavLink>
        </li>

        <li className="mypagemenu" id="nav-list-li">
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

              {userId ? (
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
                  <MenuDivider />
                  <MenuItem style={{ color: "gray" }} onClick={handleLogout}>로그아웃</MenuItem>
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
        <li id="nav-list-li">
          <AlertPage onClick={handleCheckNotification}>
          </AlertPage>
        </li>
      </ul >
    </nav >
  );
};

export default Navbar;
