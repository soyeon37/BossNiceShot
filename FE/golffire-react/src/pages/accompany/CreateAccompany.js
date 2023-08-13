import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Datetime from 'react-datetime';
import moment from 'moment';

import GolffieldModal from './GolffieldModal';
import parseGolfId from "../golffield/ParseGolfId";

import 'react-datetime/css/react-datetime.css';
import "./CreateAccompany.css";

import flagred from '../../assets/source/icons/flag-red.png';
import flagwhite from '../../assets/source/icons/flag-white.png';
import flagblack from '../../assets/source/icons/flag-black.png';
import flagall from '../../assets/source/icons/flag-all.png';
import axios from 'axios';

function CreateAccompany() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [teeUpTime, setTeeUpTime] = useState(null);
    const [field, setField] = useState(0);
    const [capacity, setCapacity] = useState('');
    const [teeBox, setTeeBox] = useState(null);

    const [isGoldFieldVisible, setIsGoldFieldVisible] = useState(false);

    const handleGoldFieldModal = () => {
        setIsGoldFieldVisible(!isGoldFieldVisible);
    }

    // 동행 모집 생성
    const createCompanion = (companionCreateRequest) => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion"

        console.log("동행 모집 생성");
        axios.post(apiUrl, companionCreateRequest).then((response) => {
            console.log(response);

            const companionUserRequset = {
                companionId: response.data.id
            };

            // 동행 모집 생성 성공 시 작성자를 동행 모집 참여자로 추가
            addCompanionUser(companionUserRequset);
        });
    }

    // 모집자를 동행 모집 참여자로 추가
    const addCompanionUser = (companionUserRequset) => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion/user"

        console.log("동행 모집 참여자 생성");
        axios.post(apiUrl, companionUserRequset).then((response) => {
            console.log(response);

            acceptCompanionUser(response.data.companionUserId);
        });
    }

    // 모집자를 수락
    const acceptCompanionUser = (companionUserId) => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion/user/" + companionUserId;
        
        console.log("동행 모집 참여자 수락");
        axios.put(apiUrl).then((response) => {
            console.log(response);
        })
    }

    // "등록하기" 버튼 클릭 이벤트를 처리하는 함수
    const handleRegisterClick = () => {
        if (title.trim() === '') {
            alert("제목을 입력해주세요.");
        } else if (description.trim() === '') {
            alert("내용을 입력해주세요.");
        } else if (teeUpTime === null) {
            alert("동행일을 선택해주세요.");
        } else if (capacity.trim() === '') {
            alert("최대인원수를 입력해주세요.");
        } else if (teeBox === null) { // 추가: 선호 티박스 선택 여부 검사
            alert("선호 티박스를 선택해주세요.");
        } else {
            const capacityNum = parseInt(capacity.trim(), 10);
            if (isNaN(capacityNum) || capacityNum < 2 || capacityNum > 4) {
                alert("최대인원수는 2에서 4사이의 숫자로 입력해주세요.");

            } else {
                const companionCreateRequest = {
                    title: title,
                    description: description,
                    field: field,
                    teeBox: teeBox,
                    capacity: capacity,
                    teeUptime: moment(teeUpTime).format('YYYY-MM-DD HH:mm:ss')
                }

                console.log(companionCreateRequest);

                createCompanion(companionCreateRequest);

                navigate('/accompany');
            }
        }
    };

    return (
        <div id="CreateAccompany">
            <div className='createA-head'>
                동행 모집하기
            </div>
            <div className='createA-body'>
                <div className='createA-mainbox'>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                        className='createA-title'
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="소개"
                        className='createA-content'
                    />
                    <div className='createA-accompanydate'>
                        <h2>동행일</h2>
                        <Datetime
                            value={moment(teeUpTime)}
                            onChange={(date) => setTeeUpTime(date)}
                            dateFormat="YYYY년MM월DD일 "
                            timeFormat="HH시mm분"
                            utc={true}
                            inputProps={{
                                className: 'createA-datetime-input',
                                placeholder: "날짜와 시간을 선택하세요",
                                readOnly: true
                            }}
                        />
                    </div>
                    <div className='createA-map'>
                        <h2>동행 장소</h2>
                        <button
                            onClick={handleGoldFieldModal}>
                            {field === 0 ? (
                                <div>골프장 선택하기</div>
                            ) : (
                                <div>{parseGolfId(field)} 선택 됨, 변경하기</div>
                            )}
                        </button>
                    </div>
                    <div className='createA-num'>
                        <h2>동행 인원</h2>
                        <input
                            type="number"
                            placeholder="본인포함 최대 4인"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>
                    <div className='createA-icon'>
                        <h2>선호 티박스</h2>
                        <div className='icon-list'>
                            <div
                                className={`icon ${teeBox === 'RED' ? 'selected-icon' : ''}`}
                                onClick={() => setTeeBox('RED')}
                            >
                                <img src={flagred} alt="flagred 1" />
                            </div>
                            <div
                                className={`icon ${teeBox === 'WHITE' ? 'selected-icon' : ''}`}
                                onClick={() => setTeeBox('WHITE')}
                            >
                                <img src={flagwhite} alt="flagwhite 2" />
                            </div>
                            <div
                                className={`icon ${teeBox === 'BLACK' ? 'selected-icon' : ''}`}
                                onClick={() => setTeeBox('BLACK')}
                            >
                                <img src={flagblack} alt="flagblack 3" />
                            </div>
                            <div
                                className={`icon ${teeBox === 'NONE' ? 'selected-icon' : ''}`}
                                onClick={() => setTeeBox('NONE')}
                            >
                                <img src={flagall} alt="flagall 4" />
                            </div>
                        </div>
                    </div>
                    <div className='createA-buttons'>
                        <Link to="/accompany" style={{ textDecoration: "none" }}>
                            <button style={{ color: 'red' }}>취소</button>
                        </Link>
                        <button style={{ color: 'green' }} onClick={handleRegisterClick}>등록하기</button>
                    </div>
                </div>
            </div>


            {/* 골프장 선택 Modal */}
            {isGoldFieldVisible &&
                <GolffieldModal
                    toggleModal={handleGoldFieldModal}
                    setAccompanyPlace={setField}
                />
            }
        </div>

    )
}

export default CreateAccompany;