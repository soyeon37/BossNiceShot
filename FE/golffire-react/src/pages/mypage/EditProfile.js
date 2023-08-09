import { React, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { InfoOutlineIcon } from '@chakra-ui/icons'
import { reissueToken } from "../../setup/user-auth/UserAuth";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";

import RedTeeImg from "../../assets/source/icons/flag-red.png";
import WhiteTeeImg from "../../assets/source/icons/flag-white.png";
import BlackTeeImg from "../../assets/source/icons/flag-black.png";
import AllTeeImg from "../../assets/source/icons/flag-all.png";
import {
    Button,
} from "@chakra-ui/react";

function EditProfile() {
    const { state } = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    // 닉네임 중복 검사
    const handleCheckNickname = () => {
        console.log("nickname: ", nickname); // Debug !!
        const data = {
            nickname: nickname
        }
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/members/checkNickname"
        axios
            .post(apiUrl, data)
            .then((response) => {
                if (response.data.data.resultMessage === "FAIL") {
                    console.log("닉네임이 중복되었습니다.");
                    alert("이미 존재하는 닉네임입니다.");
                } else {
                    console.log("유효한 닉네임입니다.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            })
    }

    // 사용자 정보 수정 테스트용 코드 - 함소연
    const testPut = () => {
        const data = {
            nickname: "햄햄햄",
            teeBox: "RED",
            topScore: 80,
            averageScore: 90,
            level: "더블 플레이어",
            image: "banana.jpg",
            introduction: "하이욤"

        }

        const apiUrl = process.env.REACT_APP_SERVER_URL + '/members/update';
        console.log(cookies.access_token);
        axios.put(apiUrl, data)
            .then((response) => {
                console.log(response.data); // 서버에서 반환된 데이터
                const statusCode = response.status;
                console.log('HTTP status code:', statusCode); // HTTP 상태 코드
            })
            .catch((error) => {
                console.error('Error:', error); // 오류 처리
                if (error.response) {
                    console.log('HTTP status code:', error.response.status); // HTTP 상태 코드
                    // HTTP 상태 코드로 토큰 만료 여부 확인
                    if (error.response.status === 401) {
                        console.log('Access Token has expired.');

                        // 토큰 재발급 등의 로직 수행
                        // callReissueToken();
                    } else if (error.response.status === 403) {
                        console.log("안됨")
                        // 토큰 재발급 등의 로직 수행
                        callReissueToken();
                    }

                }
            });
    }

    const callReissueToken = () => {
        console.log("EditProfile에서의 토큰 값: ", cookies.refreshToken);

        let isSuccess = reissueToken({
            refreshToken: cookies.refreshToken,
            setCookie,
            removeCookie,
            navigate,
        })

        if (isSuccess) {
            console.log("토큰 재발급 및 로그인 연장 성공");
        } else {
            console.log("실패 후 로그아웃 진행됨");
        }
    }


    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="EditProfile">
                    <div id="edit-pic">
                        <div id="pic-circle">
                            큰 사진 들어가는 곳
                        </div>
                        <div id="pic-button-dic">
                            <button id="pic-button">사진 변경</button>
                        </div>
                    </div>
                    <div id="edit-info">
                        <div id="edit-title">
                            정보 수정
                        </div>
                        <div id="edit-info-text">


                            <div id="edit-header-start">
                                이메일
                            </div>
                            <div id="edit-email">
                                이메일은 수정 불가
                                {/* <label htmlFor="userEmail">이메일</label>
                            <input
                                id="userEmail"
                                defaultValue={userEmail}
                                onChange={handleUserEmail}
                                placeholder="이메일"
                            /> */}
                            </div>
                            <div id="edit-header">닉네임<span id="edit-header-importance"> *</span></div>
                            <div id="edit-nickname-div">
                                <input id="edit-nickname" placeholder="닉네임">
                                </input>
                                <div id="edit-check">
                                    <button id="edit-check-button" onClick={handleCheckNickname}>검사</button>
                                </div>
                            </div>
                            <div id="edit-intro">

                                <div id="edit-header">자기소개</div>
                                <input id="edit-introduction" placeholder="자기소개"></input>
                            </div>
                            <div id="edit-golf-info1-div">
                                <div id="edit-golf-info1-1-div">
                                    <div id="edit-golf-info1-header">
                                        최고 타수
                                    </div>
                                    <input id="edit-golf-info1-1" type="number" placeholder="72"></input>
                                </div>
                                <div id="edit-golf-info1-2-div">
                                    <div id="edit-golf-info1-header">
                                        평균 타수
                                    </div>
                                    <input id="edit-golf-info1-2" type="number" placeholder="72"></input>
                                </div>
                            </div>
                            <div id="edit-golf-info2-div">
                                <div id="edit-header">
                                    선호 티박스
                                    <button id="edit-teebox-icon"><InfoOutlineIcon/></button>
                                </div>
                                <div id="edit-golf-info2">
                                    <label id="teebox">
                                        <input
                                            id="RED"
                                            value="RED"
                                            name="teebox"
                                            type="radio"
                                        />
                                        레드티
                                        <img id="teebox-img" src={RedTeeImg}></img>
                                    </label>
                                    <label id="teebox">
                                        <input
                                            id="WHITE"
                                            value="WHITE"
                                            name="teebox"
                                            type="radio"
                                        />
                                        화이트티
                                        <img id="teebox-img" src={WhiteTeeImg}></img>
                                    </label>
                                    <label id="teebox">
                                        <input
                                            id="BLACK"
                                            value="BLACK"
                                            name="teebox"
                                            type="radio"
                                        />
                                        블랙티
                                        <img id="teebox-img" src={BlackTeeImg}></img>
                                    </label>
                                    <label id="teebox">
                                        <input
                                            id="NONE"
                                            value="NONE"
                                            name="teebox"
                                            type="radio"
                                        />
                                        상관없음
                                        <img id="teebox-img" src={AllTeeImg}></img>
                                    </label>
                                </div>
                            </div>
                            <div id="edit-button-div">
                                <button id="edit-button" onClick={testPut}>
                                    저장하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EditProfile;
