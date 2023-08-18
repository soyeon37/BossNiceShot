import React from "react";
import MyPageNavbar from "./MyPageNavbar";

import "./MyPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "../../features/userInfoSlice";

import CryImg from "../../assets/source/mascot/mascot-cry-2.png";
import "./MyPage.css";

function Signout() {
    // Redux
    const dispatch = useDispatch();

    // 사용자 정보(userId)로 axios 수행
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const navigate = useNavigate();
    // cookie의 user 정보 확인
    const [cookies, setCookie] = useCookies(["refreshToken"]);
    const handleLogout = () => {
        console.log('cookies.refreshToken:', cookies.refreshToken);

        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/logout'
        const data = {
            refreshToken: cookies.refreshToken
        }
        axios.post(apiUrl, data)
            .then(response => {
                console.log(response);
                if (response.data.data === "SUCCESS") {
                    setCookie('refreshToken', cookies.refreshToken, { path: '/', maxAge: 0 });
                    handleSignout();
                } else {
                    alert('Error')
                }
            })
    }
    const handleSignout = (e) => {
        console.log("탈퇴하기");
        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/delete';
        axios
            .delete(apiUrl)
            .then((response) => {
                console.log(response);

                resetUserState(); // reset redux data

                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            })
    };

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="Signout">
                    <div id="signout-box">
                        <div id="signout-title">
                            탈퇴하기
                        </div>
                        <div id="signout-top">
                            <div id="signout-reason">
                                <div id="reason-radio">
                                    <div id="reason-title">
                                        탈퇴 사유를 알려주세요.
                                    </div>
                                    <div id="signout-reason-div">
                                        <div id="signout-reason-text">
                                            <label id="reason">
                                                <input
                                                    id="reason-text"
                                                    value="reason1"
                                                    name="reason"
                                                    type="radio"
                                                />
                                                사용감 불편
                                            </label>
                                        </div>
                                        <div id="signout-reason-text">
                                            <label id="reason">
                                                <input
                                                    id="reason-text"
                                                    value="reason2"
                                                    name="reason"
                                                    type="radio"
                                                />
                                                타 사용자 불편
                                            </label>
                                        </div>
                                        <div id="signout-reason-text">

                                            <label id="reason">
                                                <input
                                                    id="reason-text"
                                                    value="reason3"
                                                    name="reason"
                                                    type="radio"
                                                />
                                                잘 사용하지 않게 됨
                                            </label>
                                        </div>
                                        <div id="signout-reason-text">

                                            <label id="reason">
                                                <input
                                                    id="reason-text"
                                                    value="reason4"
                                                    name="reason"
                                                    type="radio"
                                                />
                                                기타 사항
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="reason-pic">
                                <img src={CryImg} />
                            </div>
                        </div>
                        <div id="reason-ect">
                            <textarea id="reason-ect-input" type="text"></textarea>
                        </div>
                        <div id="signout-notice">
                            탈퇴하시면 기존 사용자 정보가 모두 삭제됩니다.<br />
                            동의하시면 아래에 체크 후 ‘탈퇴하기’ 버튼을 눌러주세요.
                        </div>
                        <div id="signout-notice-checkbox">
                            <label id="signout-checkbox-label">
                                <input id="signout-checkbox" type="checkbox"></input>
                                동의합니다.
                            </label>
                        </div>
                        <div id="signout-button-div">
                            <button id="signout-button" onClick={handleLogout}>
                                탈퇴하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}

export default Signout;
