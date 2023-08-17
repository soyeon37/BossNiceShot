import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { BsArrowLeftCircle, BsArrowRightCircle, BsPeopleFill } from "react-icons/bs";
import { IoGolf } from "react-icons/io5";
import PinImg from "../../assets/source/icons/pin.png";

import "./study.css";
import axios from 'axios';

function CreateCRoom() {
    // 사용자 정보(userId)로 axios 수행
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const studyType = 'COACHING';
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState(2);
    const navigate = useNavigate();

    // "등록하기" 버튼 클릭 이벤트를 처리하는 함수
    const handleRegisterClick = () => {
        if (title.trim() === '') {
            alert("제목을 입력해주세요.");
        } else if (description.trim() === '') {
            alert("내용을 입력해주세요.");
        } else {
            const studyCreateRequest = {
                type: studyType,
                title: title,
                description: description,
                capacity: capacity,
                reservedTime: getNowTime(),
                locked: false,
                password: null
            }

            createCoaching(studyCreateRequest);

        }
    };

    // 옵션 관련 pagination 변수
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const isFirstPage = page === 1;
    const isLastPage = page === 2;

    const handlePageChange = (pageNum) => {
        console.log(limit, " 제한인 상태에서 다음으로 넘어가려 함.");
        if (pageNum <= limit) {
            setPage(pageNum);
            // } else {
            //     alert("값을 입력해 주세요!");
        }
    }

    // 코칭룸 생성
    const createCoaching = (studyCreateRequest) => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/study';

        console.log("스터디(코칭) 등록하기");
        console.log(studyCreateRequest);

        axios.post(apiUrl, studyCreateRequest)
            .then((response) => {
                console.log(response);

                activeCoaching(response.data.id);
            });
    };

    // 코칭룸 활성화
    const activeCoaching = (studyId) => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/study/' + studyId + '/active';

        console.log("스터디(코칭) 활성화");
        console.log(studyId);

        axios.put(apiUrl)
            .then((response) => {
                console.log(response);

                const studyUserRequest = {
                    studyId: response.data.id
                };

                enterStudyUser(studyUserRequest, response.data);
            });
    };

    // 코치 코칭룸 입장
    const enterStudyUser = (studyUserRequest, studyResponse) => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/study/user';

        console.log("코칭룸 입장");
        console.log(studyUserRequest);

        axios.post(apiUrl, studyUserRequest)
            .then((response) => {
                console.log(response);

                // 코칭룸으로 이동
                navigate('/CoachingRoom', {
                    state: {
                        type: studyType,
                        study: studyResponse,
                        studyUser: response.data
                    }
                });
            });
    };

    // 현재 시간 request 타입에 맞게 포맷
    const getNowTime = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        return `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day} ${hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}:00`;
    }

    return (
        <div id="CreateCoachingRoom" className='create-container'>
            <div className="container-head">
                <div className="container-head-title">
                    코칭룸 만들기
                </div>
                <div className="container-head-desc">
                    코칭룸을 개설해보세요.
                </div>
                <img className="list-head-pin" src={PinImg} alt="pin" />
                <div className="list-head-shadow bg-coach"></div>
            </div>

            <div className='container-body'>
                <div className='create-main bg-coach'>
                    <div className='create-main-body'>
                        <div className='create-body-text'>
                            <div className='create-body-text-title'>
                                <input
                                    className='create-title-input'
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='제목을 입력하세요' />
                            </div>
                            <div className='create-body-text-content'>
                                <textarea
                                    className='create-content-textarea'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='내용을 입력하세요' />
                            </div>
                        </div>
                        <div className='create-body-option'>
                            <div className='option-head'>
                                {(() => {
                                    switch (page) {
                                        case 1:
                                            return (
                                                <div className='option-title'>
                                                    <BsPeopleFill className='option-title-icon' />인원수
                                                </div>
                                            )
                                        default: // 2
                                            return (
                                                <div className='option-title'>
                                                    <IoGolf className='option-title-icon' />코칭룸 정보
                                                </div>
                                            )
                                    }
                                })()}
                            </div>
                            <div className='option-body'>
                                <div className='option-left'>
                                    <button
                                        className='option-arrow'
                                        disabled={isFirstPage}
                                        onClick={() => handlePageChange(page - 1)}>
                                        <BsArrowLeftCircle />
                                    </button>
                                </div>
                                <div className='option-content'>
                                    {(() => {
                                        switch (page) {
                                            case 1:
                                                return (
                                                    <div className='option-people'>
                                                        <button className='option-people-icon'
                                                            disabled={capacity >= 20}
                                                            onClick={() => setCapacity(capacity + 1)} >
                                                            <AiOutlinePlus className='option-title-icon icon-background' />
                                                        </button>
                                                        <div className="option-people-div" >
                                                            {capacity}
                                                        </div>
                                                        <button className="option-people-icon"
                                                            disabled={capacity <= 2}
                                                            onClick={() => setCapacity(capacity - 1)}>
                                                            <AiOutlineMinus className='option-title-icon icon-background' />
                                                        </button>
                                                    </div>
                                                )
                                            default: // 2
                                                return (
                                                    <div className='option-total' style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <div className='option-total-bold'>
                                                            {capacity}명
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    })()}
                                </div>
                                <div className='option-right'>
                                    <button
                                        className='option-arrow'
                                        disabled={isLastPage}
                                        onClick={() => handlePageChange(page + 1)}>
                                        <BsArrowRightCircle />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='create-main-footer'>
                        <Link to="/studylist">
                            <button className='button cancel'>취소하기</button>
                        </Link>
                        <button
                            className='button confirm'
                            onClick={handleRegisterClick}
                        >등록하기</button>
                    </div>
                </div>
                <div className='create-body-shadow bg-shadow'></div>
            </div>
        </div>
    )
}


export default CreateCRoom;
