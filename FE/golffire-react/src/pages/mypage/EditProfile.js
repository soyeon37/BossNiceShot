import React from "react";
import MyPageNavbar from "./MyPageNavbar";

import { useCookies } from "react-cookie";
import axios from "axios";

function EditProfile() {

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    // 사용자 정보 수정 테스트용 코드 - 함소연
    const testPut = () => {
        const data = {
            password: "1234",
            nickname: "함싸피",
            teeBox: "RED",
            topScore: 72,
            averageScore: 88,
            level: "보기 플레이어",
            image: "apple.jpg",
            introduction: "방가방가"
        }

        const apiUrl = 'http://localhost:8080/members/update';
        console.log(cookies.access_token);
        axios.put(apiUrl, data, {
            headers: { 'Authorization': 'Bearer ' + cookies.access_token }
        })
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
                        reissueToken();
                    }

                }
            });
    }
    const reissueToken = () => {
        console.log('refrshToken:', cookies.refresh_token);
        const apiUrl = 'http://localhost:8080/members/reissue';
        axios.post(apiUrl, cookies.refresh_token, { headers: { 'Authorization': 'Bearer ' + cookies.access_token } })
            .then((response) => {
                const message = response.data.data.message;
                if (message === "SUCCESS") {
                    const newAccessToken = response.data.data.accessToken;
                    // console.log(newAccessToken);
                    removeCookie('access_token');
                    setCookie('access_token', newAccessToken, { path: '/' });
                } else {
                    console.log('EXPIRED_TOKEN_MESSAGE: ', message);
                    // 로그아웃 시켜주는 func 실행
                }
            })
            .catch((error) => {
                console.error('Error:', error); // Debug Code
            });
    }

    return (
        <div id="EditProfile">
            EditProfile

            <MyPageNavbar />
        </div >
    );
}

export default EditProfile;
