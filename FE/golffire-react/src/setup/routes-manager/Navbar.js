import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import Interceptor from "../../setup/user-auth/Interceptor";

import AlertPage from "./alert/AlertPage";

import { HiUserCircle } from "react-icons/hi";
import Favicon from "../../assets/source/imgs/favicon.png";
import Logo from "../../assets/source/imgs/BNS_LOGO.png"
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
  const [checkToken, setCheckToken] = useState(0);
  const [doLogin, setDoLogin] = useState(0);
  const [doLogout, setDoLogout] = useState(0);

  // 사용자 정보(userId)로 로그인 여부 판단
  const userId = useSelector((state) => state.userInfoFeature.userId);
  const userNickname = useSelector((state) => state.userInfoFeature.userNickname);
  const userProfile = useSelector((state) => state.userInfoFeature.userImage);
  const userAccessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
  // const userProfile = "green_cap_bear yellow";

  // URL이 바뀔 때마다 실행되는 코드
  useEffect(() => {
    // console.log("Navbar에 저장된 사용자 정보: ", userId, "&", userNickname, "&", userProfile);
    // console.log("새로고침마다 확인하는 access token? ", userAccessToken);
  },)

  // 사진 출력을 위한 변수
  let profileValues = "";
  if (userProfile) profileValues = userProfile.split(' ');

  // 사진 배경 색상을 map으로 관리
  const colorMap = {
    "red": "#F24141",
    "yellow": "#FFE000",
    "green": "#3BD641",
    "blue": "#80CAFF",
    "white": "#FFFFFF",
  }

  const checkProfilePic = () => {
    // console.log("프로필 값을 확인: ", userProfile);

    if (userProfile) {
      // console.log("가능!");
      return true;
    } else {
      // console.log("쓸 수 없는 사진임");
      return false;
    }
  }

  const navigate = useNavigate();

  // cookie의 user 정보 확인
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);

  // 로그아웃 함수
  const handleLogout = () => {
    console.log("네브바에서 로그아웃 호출함");
    setDoLogout(doLogout + 1);
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
      <NavLink to="/" className="site-title">
        <img className="favicon-img" src={Favicon} alt="favicon" />
        <img className="favicon-img" src={Logo} alt="logo" />
      </NavLink>
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
          <NavLink to="/accompany" id="nav-list-link" style={({ isActive, isPending }) => {
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
            {checkProfilePic() ? (
              <div className="nav-alarm-parent">
                <MenuButton>
                  <div className="navbar-user-icon">
                    <div className="navbar-user-circle"
                      style={{ backgroundColor: colorMap[profileValues[1]] }}>
                      <img className="navbar-user-image"
                        src={require(`../../assets/source/profile/${profileValues[0]}.png`)} />
                    </div>
                  </div>
                </MenuButton>
                <AlertPage onClick={handleCheckNotification}>
                </AlertPage>
              </div>
            ) : (
              <div className="nav-alarm-parent">
                <MenuButton>
                  <HiUserCircle className="nav-alarm-pic" />
                </MenuButton>
                {/* <AlertPage onClick={handleCheckNotification}>
                </AlertPage> */}
              </div>
            )}
            <MenuList>

              {userId ? (
                <MenuGroup title=''>
                  <NavLink to="/mypage/info" style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                    };
                  }}>
                    <MenuItem>
                      마이페이지
                    </MenuItem>
                  </NavLink>
                  <MenuDivider />
                  <MenuItem style={{ color: "gray" }}
                    onClick={handleLogout}>
                    로그아웃</MenuItem>
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
      </ul >

      <Interceptor
        checkToken={checkToken}
        doLogin={doLogin}
        doLogout={doLogout}
      />

    </nav >
  );
};

export default Navbar;
