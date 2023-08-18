import React, { useEffect, useState } from "react";
import MyPageNavbar from "./MyPageNavbar";
import axios from "axios";

// Redux
import { useSelector } from "react-redux";

import { getNameById } from "../golffield/ParseGolfId";

import flagred from "../../assets/source/icons/flag-red.png";
import flagwhite from "../../assets/source/icons/flag-white.png";
import flagblack from "../../assets/source/icons/flag-black.png";
import flagall from "../../assets/source/icons/flag-all.png";

import "./MyPage.css";

function MyAccompany() {
    // 사용자 정보(userId)로 axios 수행
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const [owned, setOwned] = useState([]);
    const [joined, setJoined] = useState([]);
    const [ownOrJoin, setOwnOrJoin] = useState(true);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion/";
        // console.log("사용자 id(", userId, ") 기반으로 동행 리스트 호출"); // Debug Code !!!

        axios.get(apiUrl + "created").then((response) => {
            setOwned(response.data);
            console.log("모집한 데이터: ", response.data); // Debug Code !!!
        }).catch((error) => {
            console.log("생성한 리스트 호출 중 에러 발생: ", error);
        });

        axios.get(apiUrl + "participating").then((response) => {
            setJoined(response.data);
            console.log("참여한 데이터: ", response.data); // Debug Code !!!
        }).catch((error) => {
            console.log("참여한 리스트 호출 중 에러 발생: ", error);
        });

    }, [])

    // 이미지 파일 경로를 객체로 관리
    const teeMap = {
        RED: flagred,
        WHITE: flagwhite,
        BLACK: flagblack,
        NONE: flagall,
    };

    // 일시 보기 좋게 변환
    const dateFormat = (input) => {
        const date = new Date(input);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
    };

    const handleOwnOrJoin = () => {
        setOwnOrJoin(!ownOrJoin);
    }

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyAccompany">
                    <div id="myacc-title">
                        나의 동행
                    </div>
                    <div id="myacc-toggle">
                        <button
                            className={`toggle-button myacc-toggle-${ownOrJoin ? 'true' : 'false'}`}
                            onClick={handleOwnOrJoin} >
                            모집
                        </button>
                        <button
                            className={`toggle-button myacc-toggle-${!ownOrJoin ? 'true' : 'false'}`}
                            onClick={handleOwnOrJoin} >
                            신청
                        </button>
                    </div>

                    <div id="myacc-list">
                        {ownOrJoin ? (
                            <div id="myacc-body">
                                {owned.map((companion, index) => (
                                    <div id="myacc-list-div" key={index}>
                                        <div id="myacc-list-top">
                                            <div id="myacc-list-top-div">
                                                <div id="myacc-list-title">
                                                    {companion.title}
                                                </div>
                                                <div id="myacc-list-teebox">
                                                    <img id="teebox-img" src={teeMap[companion.teeBox]}></img>
                                                </div>
                                            </div>
                                            <div id="myacc-list-field">
                                                {getNameById(companion.field)}
                                            </div>
                                            <div id="myacc-list-day">
                                                {dateFormat(companion.teeUptime)}
                                            </div>
                                        </div>
                                        <div id="myacc-list-bottom">
                                            <button id="myacc-list-button">
                                                수정하기
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div id="myacc-body">
                                {joined.map((companion, index) => (
                                    <div id="myacc-list-div" key={index}>
                                        <div id="myacc-list-top">
                                            <div id="myacc-list-top-div">
                                                <div id="myacc-list-title">
                                                    {companion.title}
                                                </div>
                                                <div id="myacc-list-teebox">
                                                    <img id="teebox-img" src={teeMap[companion.teeBox]}></img>
                                                </div>
                                            </div>
                                            <div id="myacc-list-field">
                                                {getNameById(companion.field)}
                                            </div>
                                            <div id="myacc-list-day">
                                                {dateFormat(companion.teeUptime)}
                                            </div>
                                        </div>
                                        <div id="myacc-list-bottom">
                                            <button id="myacc-list-button">
                                                수정하기
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default MyAccompany;
