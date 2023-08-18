import { React, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import Interceptor from "../../setup/user-auth/Interceptor";

import MyPageNavbar from "./MyPageNavbar";
import ProfilePicModal from "../signup/ProfilePicModal";
import { getImage, getBackground } from "../../setup/error-manager/ParseProfile";

import RedTeeImg from "../../assets/source/icons/flag-red.png";
import WhiteTeeImg from "../../assets/source/icons/flag-white.png";
import BlackTeeImg from "../../assets/source/icons/flag-black.png";
import AllTeeImg from "../../assets/source/icons/flag-all.png";

import { AiOutlineInfoCircle } from "react-icons/ai";
import "./MyPage.css";

function EditProfile() {
    const navigate = useNavigate();

    // Redux
    const dispatch = useDispatch();
    const [checkToken, setCheckToken] = useState(0);
    const [doLogin, setDoLogin] = useState(0);
    const [doLogout, setDoLogout] = useState(0);
    // AccessToken (Redux)
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    // Header (AccessToken)
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const state = useSelector((state) => state.userInfoFeature);
    console.log("state: ", state);

    // 사용자 정보
    const userId = (state.userId);
    const [nickname, setNickname] = useState(state.userNickname);
    const [introduce, setIntroduce] = useState("");
    const [topScore, setTopScore] = useState(0);
    const [averageScore, setAverageScore] = useState(0);
    const [teeBox, setTeeBox] = useState(state.userTee);
    const [image, setImage] = useState(state.image);

    const [imgPic, setImgPic] = useState(getImage(image));
    const [imgClr, setImgClr] = useState(getBackground(image));

    // 처음 한 번만 실행되는 함수
    useEffect(() => {
        console.log("처음 실행할 때 사용자 정보 요청해 보여주기");

        // axios code
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/members/info";
        axios.get(apiUrl)
            .then(response => {
                console.log("성공, ", response)
                // 사용자 정보 저장 필요
                // 닉네임, 자기소개, 최고 타수, 평균타수, 티박스, 사진
                const gotData = response.data.data;
                setNickname(gotData.nickname);
                setIntroduce(gotData.introduce);
                setTopScore(gotData.topScore)
                setAverageScore(gotData.averageScore);
                setTeeBox(gotData.teeBox);
                setImage(gotData.image);

                setImgPic(getImage(image))
                setImgClr(getBackground(image))
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

    // 모달 창 띄우고 내리는 변수 및 함수
    const [modalVisible, setModalVisible] = useState(false);
    const handleProfilePicModal = () => {
        setModalVisible(!modalVisible);
    }

    // AccessToken
    const userAccessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userAccessToken}`;

    // 닉네임 중복 검사
    const handleCheckNickname = () => {
        console.log("nickname: ", nickname); // Debug Code !!!
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

    // 사용자 정보 수정 함수
    const handleChangeInfo = () => {
        // console.log("수정할 예정");
        let level = "";
        if (averageScore <= 60) {
            level = "이글 플레이어";
        } else if (averageScore <= 70) {
            level = "버디 플레이어";
        } else if (averageScore <= 80) {
            level = "파 플레이어";
        } else if (averageScore <= 90) {
            level = "보기 플레이어";
        } else {
            level = "더블 플레이어";
        }

        const data = {
            nickname: nickname,
            teeBox: teeBox,
            topScore: topScore,
            averageScore: averageScore,
            level: level,
            image: image,
            introduction: introduce
        }

        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/members/update';

        axios.put(apiUrl, data)
            .then((response) => {
                console.log(response.data); // 서버에서 반환된 데이터
                const statusCode = response.status;
                console.log('정보 수정 성공, HTTP status code:', statusCode); // HTTP 상태 코드

                alert("정보가 수정되었습니다.")
                navigate('/mypage/info');
            })
            .catch((error) => {
                console.error('정보 수정 실패 Error:', error); // 오류 처리
                if (error.response) {
                    console.log('HTTP status code:', error.response.status); // HTTP 상태 코드
                    // HTTP 상태 코드로 토큰 만료 여부 확인
                    if (error.response.status === 401) {
                        console.log("401 Error, reissue");
                        setCheckToken(checkToken + 1);
                    } else if (error.response.status === 403) {
                        console.log("403 Error, reissue")
                        setCheckToken(checkToken + 1);
                    }
                }
            });
    }

    // 최고 타수 함수
    const handleTopScoreChange = (e) => {
        const newValue = e.target.value;

        // 최소값 0
        if (newValue.length == 0) {
            setTopScore(0);
        } else if (newValue.length >= 2 && newValue[0] === '0') {
            // newValue가 2자 이상이고 첫 글자가 0인 경우 0 제거
            const numericValue = parseInt(newValue, 10); // 숫자로 변환 (앞의 0 제거)
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
                setTopScore(numericValue);
            }
        } else {
            // 그 외의 경우 그대로 처리
            const numericValue = parseInt(newValue, 10);
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
                setTopScore(numericValue);
            }
        }
    }

    // 평균 타수 함수
    const handleAverageScoreChange = (e) => {
        const newValue = e.target.value;

        // 최소값 0
        if (newValue.length == 0) {
            setAverageScore(0);
        } else if (newValue.length >= 2 && newValue[0] === '0') {
            // newValue가 2자 이상이고 첫 글자가 0인 경우 0 제거
            const numericValue = parseInt(newValue, 10); // 숫자로 변환 (앞의 0 제거)
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
                setAverageScore(numericValue);
            }
        } else {
            // 그 외의 경우 그대로 처리
            const numericValue = parseInt(newValue, 10);
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 144) {
                setAverageScore(numericValue);
            }
        }
    }

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="EditProfile">
                    <div id="pic-circle">
                        <div id="edit-pic">
                            <div className="user-banner-profile">
                                <div className="user-banner-circle"
                                    style={{ backgroundColor: colorMap[imgClr] }}>
                                    <img className="user-banner-circle-fill"
                                        src={require(`../../assets/source/profile/${imgPic}.png`)} />
                                </div>
                            </div>
                        </div>
                        <div id="pic-button-dic">
                            <button id="pic-button" onClick={handleProfilePicModal}>사진 변경</button>
                        </div>
                    </div>
                    <div id="edit-info">
                        <div id="edit-title">
                            정보 수정
                        </div>
                        <div id="edit-info-text">
                            <div id="edit-header-start">이메일</div>
                            <div id="edit-email">{userId}</div>
                            <div id="edit-header">
                                닉네임 <span id="edit-header-importance">*</span>
                            </div>
                            <div id="edit-nickname-div">
                                <input
                                    id="edit-nickname"
                                    placeholder="닉네임"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)} />
                                <div id="edit-check">
                                    <button id="edit-check-button" onClick={handleCheckNickname}>검사</button>
                                </div>
                            </div>
                            <div id="edit-intro">
                                <div id="edit-header">자기소개</div>
                                <input
                                    id="edit-introduction"
                                    placeholder="자기소개"
                                    value={introduce}
                                    onChange={(e) => setIntroduce(e.target.value)} />
                            </div>
                            <div id="edit-golf-info1-div">
                                <div id="edit-golf-info1-1-div">
                                    <div id="edit-golf-info1-header">최고 타수</div>
                                    <input
                                        id="edit-golf-info1-1"
                                        type="number"
                                        value={topScore}
                                        onChange={handleTopScoreChange} />
                                </div>
                                <div id="edit-golf-info1-2-div">
                                    <div id="edit-golf-info1-header">평균 타수</div>
                                    <input
                                        id="edit-golf-info1-2"
                                        type="number"
                                        value={averageScore}
                                        onChange={handleAverageScoreChange} />
                                </div>
                            </div>
                            <div id="edit-golf-info2-div">
                                <div className="user-func-label">
                                    선호 티 박스

                                    <div className="tee-tooltip">
                                        <AiOutlineInfoCircle className="tee-tooltip-icon" />
                                        <span className="tee-tooltip-text">
                                            레이디 티(레드 티): 여성이나 어린이를 위한 티 박스로 홀 과의 거리가 가장 짧은 티 박스입니다.<br />
                                            레귤러 티(화이트 티): 일반 남성, 여성 상급자, 여성 프로, 청소년 선수 들을 위한 티 박스로 레드 티보다 홀 과의 거리가 멉니다.<br />
                                            블랙 티: 몇몇 골프장은 블루 티보다 거리가 먼 블랙 티 박스가 있습니다. 상급자 남성, 프로 선수들이 플레이 합니다.<br />
                                            출처: <a className="clickable" href="http://www.golifekorea.com" target="_blank">고라이프코리아</a>
                                        </span>
                                    </div>

                                </div>
                                <div className="user-func-radio-block" >
                                    <img src={RedTeeImg} alt="레드 티 박스"
                                        onClick={() => setTeeBox('RED')}
                                        className={`option-tee-img${teeBox === 'RED' ? '-selected' : ''}`} />
                                    <img src={WhiteTeeImg} alt="화이트 티 박스"
                                        onClick={() => setTeeBox('WHITE')}
                                        className={`option-tee-img${teeBox === 'WHITE' ? '-selected' : ''}`} />
                                    <img src={BlackTeeImg} alt="블랙 티 박스"
                                        onClick={() => setTeeBox('BLACK')}
                                        className={`option-tee-img${teeBox === 'BLACK' ? '-selected' : ''}`} />
                                    <img src={AllTeeImg} alt="모든 티 박스"
                                        onClick={() => setTeeBox('NONE')}
                                        className={`option-tee-img${teeBox === 'NONE' ? '-selected' : ''}`} />
                                </div>
                            </div>
                            <div id="edit-button-div">
                                <button id="edit-button" onClick={handleChangeInfo}>
                                    저장하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 프로필 꾸미기 Modal */}
            {modalVisible && (
                <ProfilePicModal
                    initialPic={getImage(image)}
                    initialClr={getBackground(image)}
                    setImgPic={setImgPic}
                    setImgClr={setImgClr}
                    handleProfilePicModal={handleProfilePicModal}
                />
            )}

            <Interceptor
                checkToken={checkToken}
                doLogin={doLogin}
                doLogout={doLogout}
            />

        </div >
    );
}

export default EditProfile;
