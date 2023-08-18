import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import {getImage, getBackground} from "../../setup/error-manager/ParseProfile";
import MyPageNavbar from "./MyPageNavbar";
import "./MyPage.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import Interceptor from "../../setup/user-auth/Interceptor";

function EditPassword() {
    // 사용자 정보(userId)로 axios 수행
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const navigate = useNavigate();

    const [passOrigin, setPassOrigin] = useState("");
    const [passNew, setPassNew] = useState("");
    const [passCheck, setPassCheck] = useState("");

    const state = useSelector((state) => state.userInfoFeature);
    const [image, setImage] = useState(state.image);

    const [imgPic, setImgPic] = useState("green_suncap_tiger");
    const [imgClr, setImgClr] = useState("white");

    // 처음 한 번만 실행되는 함수
    useEffect(() => {
        console.log("처음 실행할 때 사용자 정보 요청해 보여주기");

        // axios code
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/info";
        axios.get(apiUrl)
            .then(response => {
                console.log("성공, ", response.data.data);
                // 사용자 정보 저장 필요
                // 닉네임, 자기소개, 최고 타수, 평균타수, 티박스, 사진

                const gotImage = response.data.data.image;
                if (gotImage) setImage(gotImage);
                setImgPic(getImage(image));
                setImgClr(getBackground(image));
            })
            .catch(error => {
                console.error('error 발생: ', error);
            });
    }, [])

    // 사진 배경 색상을 map으로 관리
    const colorMap = {
        "red": "#F24141",
        "yellow": "#FFE000",
        "green": "#3BD641",
        "blue": "#80CAFF",
        "white": "#FFFFFF",
    }

    // 현재 비밀번호 입력 감지
    const handlePassOrigin = (e) => {
        setPassOrigin(e.target.value);
    };

    // 새 비밀번호 입력 감지
    const handlePassNew = (e) => {
        setPassNew(e.target.value);
    };

    // 비밀번호 확인 입력 감지
    const handlePassCheck = (e) => {
        setPassCheck(e.target.value);
    };

    // 비밀번호 변경 수행
    const handleChangePass = (e) => {
        console.log("passOrigin: ", passOrigin);
        console.log("passNew: ", passNew);
        console.log("passCheck: ", passCheck);
        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/updatePassword'
        const data = {
            passOrigin: passOrigin,
            passNew: passNew
        }
        axios.put(apiUrl, data)
            .then((response) => {
                console.log(response);
                if (response.data.data.resultMessage === "SUCCESS") {
                    alert('비밀번호 변경에 성공했습니다.');
                    navigate('/mypage/info')
                }
            })
            .catch((error) => {
                console.error(error);
                alert('비밀번호 변경에 실패했습니다.');
            })

    };

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="EditPassword">
                    <div id="edit-pic">
                        <div id="edit-pic">
                            <div className="user-banner-profile">
                                <div className="user-banner-circle"
                                    style={{ backgroundColor: colorMap[imgClr] }}>
                                    <img className="user-banner-circle-fill"
                                        src={require(`../../assets/source/profile/${imgPic}.png`)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="edit-pass">
                        <div id="edit-title">
                            비밀번호 변경하기
                        </div>
                        <div id="edit-pass-text">
                            <div id="edit-pass-origin">
                                <div id="edit-pass-header">
                                    현재 비밀번호
                                </div>
                                <input
                                    id="input-origin"
                                    type="password"
                                    defaultValue={passOrigin}
                                    onChange={handlePassOrigin}
                                    placeholder="현재 비밀번호를 입력하세요"
                                />
                            </div>
                            <div id="edit-pass-new">
                                <div id="edit-pass-header">
                                    새 비밀번호
                                </div>
                                <input
                                    id="input-new"
                                    type="password"
                                    defaultValue={passNew}
                                    onChange={handlePassNew}
                                    placeholder="새 비밀번호를 입력하세요"
                                />
                            </div>
                            <div id="edit-pass-check">
                                <div id="edit-pass-header">
                                    비밀번호 확인
                                </div>
                                <input
                                    id="input-check"
                                    type="password"
                                    defaultValue={passCheck}
                                    onChange={handlePassCheck}
                                    placeholder="새 비밀번호를 한 번 더 입력해 주세요"
                                />
                            </div>
                            <div id="edit-pass-button-div">
                                <button id="edit-button" onClick={handleChangePass}>
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EditPassword;
