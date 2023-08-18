import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
    setUserId,
    setUserNickname,
    setUserLevel,
    setUserTee,
    setUserImage,
    setUserAccessToken,
    resetUserState
} from "../../features/userInfoSlice";

const Interceptor = ({ checkToken, doLogin, doLogout }) => {
    // Redux
    const dispatch = useDispatch();
    // AccessToken (Redux)
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    // RefreshToken (cookies)
    const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);
    const refreshToken = cookies.refreshToken;
    // navigate
    const navigate = useNavigate();

    useEffect(() => {
        console.log("처음 로딩되는 곳");
    }, []);

    // interceptor의 기능, 항상 실행되야 하는 코드
    // token 만료 여부 확인 후 만료 시 재발급
    useEffect(() => {
        if (!checkToken) return;

        console.log("token 만료 확인"); // Debug Code !!!
        reissueToken();
        // 1. accesstoken 값 항상 확인
        // 1-1. 만료 시 재발급 (refresh token 사용)

        // 2-1. 재발급 실패(refresh token 만료) 시 로그아웃
        // 3. 로그아웃 후 main으로 redirect (navigate 불가)

        // 2-2. 재발급 성공 시 해당 값 저장


        // 1-2. 가능한 값이면 그대로 진행

    }, [checkToken]);

    // 로그인 수행 함수
    useEffect(() => {
        if (!doLogin) return;
        handleLogin();
    }, [doLogin]);

    // 로그아웃 수행 함수
    useEffect(() => {
        if (!doLogout) return;

        console.log("로그아웃 진행"); // Debug Code !!!

        // 토큰 재발급 후 로그아웃 진행해야 함 (지금은 로그아웃 먼저!);
        // 1. 토큰 값 유효한지 확인
        // 1-1. access가 유효하면 로그아웃
        // 1-2. 만료 시 재발급
        // 3. refresh token도 만료 시 그대로 모든 정보 삭제 (서버도 더이상 날 사용자로 안 봄)

        // 2. 재발급한 accesstoken으로 로그아웃
        handleLogout();

    }, [doLogout]);

    // AccessToken이 유효한지 확인 후 boolean 값 반환
    const checkAccessToken = () => {
        console.log("access token 확인");
    }

    // RefreshToken로 AccessToken 재발급 후 true 반환
    // RefreshToken 만료 시, 재발급 실패 후 false 반환
    const reissueToken = () => {
        console.log("access token 재발급, 저장된 refresh token? ", refreshToken); // Debug Code !!!

        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/reissue';
        const headers = {
            "Content-Type": `application/json`,
            refreshToken: refreshToken,
        };

        axios
            .get(apiUrl, {
                headers: headers,
            })
            .then((response) => {
                console.log("refreshtoken 재발급을 한 뒤 받은 답변?", response); /////

                const message = response.data.data.message;
                if (message === "SUCCESS") {
                    const newAccessToken = response.data.data.accessToken;
                    console.log("refreshtoken 재발급 성공!");
                    console.log("reissueToken - Interceptor; ", newAccessToken); // Debug Code !!!

                    dispatch(setUserAccessToken(newAccessToken));
                    return true;
                } else {
                    console.log("refreshtoken 재발급 실패!");
                    console.log('EXPIRED_TOKEN_MESSAGE: ', message);
                    alert("토큰 만료되어 자동 로그아웃 됩니다.");
                    handleLogout();
                    return false;
                }
            })
            .catch((error) => {
                console.error('재발급 중 에러 발생, ', error); // Debug Code !!!
                handleLogout();
                // return false;
            });
    }

    // 로그아웃만 진행하는 코드
    const handleLogout = () => {
        console.log("handleLogout"); // Debug Code !!!

        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/logout';
        const data = {
            refreshToken: refreshToken,
        };

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        axios.post(apiUrl, data, { headers }).then((response) => {
            console.log("logout 요청에 대한 답변: ", response); // Debug Code !!!

            if (response.data.data === "SUCCESS") {
                setCookie("refreshToken", cookies.refreshToken, { path: "/", maxAge: 0 });
                console.log("로그아웃 처리 성공"); // Debug Code !!!
                dispatch(resetUserState());

                // navigate('/');
                window.location.replace('/');
            } else {
                console.log("Logout not successed, responsed data: ", response.data); // Debug Code !!!
                // alert('Error');
                // navigate("/error");
            }
        }).catch((error) => {
            console.log("Logout Error: ", error); // Debug Code !!!
            // alert('Error');
            // navigate("/error");
        });
    }

    // 로그인만 진행하는 코드
    const handleLogin = () => {
        console.log("handleLogin"); // Debug Code !!!

        const data = doLogin;
        console.log("data:", data); // Debug Code !!!

        // 서버 API 엔드포인트 URL
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/sign-in";

        // Axios를 사용하여 POST 요청 보내기
        axios
            .post(apiUrl, data)
            .then((response) => {
                // 서버로부터 받은 정보
                const responsedData = response.data.data;
                const access_token = responsedData.token.accessToken;
                const refresh_token = responsedData.token.refreshToken;

                // header에 accesstoken 저장 (사용불가)
                axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
                // Redux(Local Storage)에 accesstoken 저장
                dispatch(setUserAccessToken(access_token));

                // 쿠키에 refresh token 정보 저장
                setCookie("refreshToken", refresh_token, {
                    path: "/",
                    maxAge: new Date().getDate() + 60 * 60 * 24 * 14,
                });

                console.log("로그인 성공한 사람의 정보: ", responsedData); // Debug Code !!

                // NavBar에 사용자 정보 저장
                dispatch(setUserId(responsedData.id)); // email과 동일한 값
                dispatch(setUserNickname(responsedData.nickname));
                dispatch(setUserImage(responsedData.image));
                dispatch(setUserLevel(responsedData.level));
                dispatch(setUserTee(responsedData.teeBox));

                // 로그인 성공 후 Main으로 복귀
                navigate("/");
            })
            .catch((error) => {
                console.log("에러내용확인:", error)
                if (error.response == 500) {
                    alert("로그인 정보가 잘못되었습니다. 다시 확인해 주세요.");
                } else {
                    console.error("Error:", error); // Debug Code !!
                    dispatch(resetUserState());
                    // 로그인 실패를 화면에 표시하는 코드 필요 !!
                    // navigate("/error");
                }
            });
    }
}

export default Interceptor;