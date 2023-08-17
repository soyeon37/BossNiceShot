import React, { useEffect, useState } from "react";
import MyPageNavbar from "./MyPageNavbar";
import axios from "axios";

// Redux
import { useSelector } from "react-redux";

import "./MyPage.css";
import RedTeeImg from "../../assets/source/icons/flag-red.png";

function MyAccompany() {
    // 사용자 정보(userId)로 axios 수행
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const [owned, setOwned] = useState([]);
    const [joined, setJoined] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion/created";

        console.log("사용자 id(", userId, ") 기반으로 동행 리스트 호출"); // Debug Code !!!

        axios.get(apiUrl).then((response) => {
            setOwned(response.data);
            console.log("데이터: ", response.data); // Debug Code !!!

        }).catch((error) => {
            console.log("생성한 리스트 호출 중 에러 발생: ", error);
        });

    }, [])

    const personInfo = [
        {
            title: "골프러버들",
            day: "2023-09-10 11:20",
            filed: "포천힐스",
            teebox: "RED",
            aimpeople: 4,
            currentpeople: 2,
        },
        {
            title: "골프러버들",
            day: "2023-09-10 11:20",
            filed: "포천힐스",
            teebox: "RED",
            aimpeople: 4,
            currentpeople: 2,
        },
        {
            title: "골프러버들",
            day: "2023-09-10 11:20",
            filed: "포천힐스",
            teebox: "RED",
            aimpeople: 4,
            currentpeople: 2,
        },
        {
            title: "골프러버들",
            day: "2023-09-10 11:20",
            filed: "포천힐스",
            teebox: "RED",
            aimpeople: 4,
            currentpeople: 2,
        },
        {
            title: "골프러버들",
            day: "2023-09-10 11:20",
            filed: "포천힐스",
            teebox: "RED",
            aimpeople: 4,
            currentpeople: 2,
        },
        {
            title: "골프러버들",
            day: "2023-09-10 11:20",
            filed: "포천힐스",
            teebox: "RED",
            aimpeople: 4,
            currentpeople: 2,
        },
        {
            title: "골프러버들",
            day: "2023-09-10 11:20",
            filed: "포천힐스",
            teebox: "RED",
            aimpeople: 4,
            currentpeople: 2,
        }
    ]

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyAccompany">
                    <div id="myacc-title">
                        나의 동행
                    </div>
                    <div id="myacc-toggle">
                        모집/신청
                    </div>
                    <div id="myacc-list">
                        <div id="myacc-body">
                            {owned.map((companion, index) => (
                                <div id="myacc-list-div" key={index}>
                                    <div id="myacc-list-top">
                                        <div id="myacc-list-top-div">
                                            <div id="myacc-list-title">
                                                {companion.title}
                                            </div>
                                            <div id="myacc-list-teebox">
                                                <img id="teebox-img" src={RedTeeImg}></img>
                                            </div>
                                        </div>
                                        <div id="myacc-list-field">
                                            {companion.filed}
                                        </div>
                                        <div id="myacc-list-day">
                                            {companion.day}
                                        </div>
                                    </div>
                                    <div id="myacc-list-bottom">
                                        <button id="myacc-list-button">
                                            {companion.currentpeople}/{companion.aimpeople}
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAccompany;
