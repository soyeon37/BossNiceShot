import React from "react";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";
import RedTeeImg from "../../assets/source/icons/flag-red.png";
function MyAccompany() {
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
                            {personInfo.map((companion, index) => (
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
