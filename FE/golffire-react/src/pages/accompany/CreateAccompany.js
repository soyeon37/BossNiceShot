import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Datetime from 'react-datetime';
import moment from 'moment';

import GolffieldModal from './GolffieldModal';
import { getNameById, getAddressById, getCallById } from "../golffield/ParseGolfId";

import 'react-datetime/css/react-datetime.css';
import './GolffieldModal.css';

import flagred from '../../assets/source/icons/flag-red.png';
import flagwhite from '../../assets/source/icons/flag-white.png';
import flagblack from '../../assets/source/icons/flag-black.png';
import flagall from '../../assets/source/icons/flag-all.png';
import PinImg from "../../assets/source/icons/pin.png";
import NaverLogo from "../../assets/source/icons/naver_icon.png";

import { FaMapMarkerAlt } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BsArrowLeftCircle, BsArrowRightCircle, BsPeopleFill } from "react-icons/bs";
import { IoGolf, IoCall } from "react-icons/io5";
import { MdSportsGolf } from "react-icons/md";

function CreateAccompany() {
    // 옵션 관련 pagination 변수
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const isFirstPage = page === 1;
    const isLastPage = page === 5;

    const handlePageChange = (pageNum) => {
        // if (pageNum <= limit)
        setPage(pageNum);
    }

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [accompanyDate, setAccompanyDate] = useState(null);
    const [accompanyPlace, setAccompanyPlace] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [maxParticipants, setMaxParticipants] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const navigate = useNavigate();

    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    // 네이버 검색창 연결 함수
    const searchOnNaver = () => {
        const naverSearchUrl = `https://search.naver.com/search.naver?query=` + getNameById(accompanyPlace);
        window.open(naverSearchUrl, '_blank');
    }

    // "등록하기" 버튼 클릭 이벤트를 처리하는 함수
    const handleRegisterClick = () => {
        if (title.trim() === '') {
            alert("제목을 입력해주세요.");
        } else if (value.trim() === '') {
            alert("내용을 입력해주세요.");
        } else if (accompanyDate === null) {
            alert("동행일을 선택해주세요.");
        } else if (endDate === null) {
            alert("마감일을 선택해주세요.");
        } else if (maxParticipants.trim() === '') {
            alert("최대인원수를 입력해주세요.");
        } else if (selectedIcon === null) { // 추가: 선호 티박스 선택 여부 검사
            alert("선호 티박스를 선택해주세요.");
        } else {
            const maxParticipantsNum = parseInt(maxParticipants.trim(), 10);
            if (isNaN(maxParticipantsNum) || maxParticipantsNum < 2 || maxParticipantsNum > 4) {
                alert("최대인원수는 2에서 4사이의 숫자로 입력해주세요.");

            } else {
                // 등록 또는 제출 로직을 여기에 작성합니다.
                // 예를 들어, 서버로 데이터를 전송하거나 원하는 다른 작업을 수행할 수 있습니다.
                console.log("Title:", title);
                console.log("Content:", value);
                console.log("Accompony Date:", accompanyDate);
                console.log("End Date:", endDate);
                console.log("Max Participants:", maxParticipants);
                console.log("Selected Icon:", selectedIcon);
                navigate('/accompany');
            }
        }
    };

    return (
        <div id="CreateAccompany" className='create-container'>
            <div className="container-head">
                <div className="container-head-title">
                    동행 모집하기
                </div>
                <div className="container-head-desc">
                    원하는 날짜와 장소에 같이 갈 동행을 구해보아요.
                </div>
            </div>
            <img className="list-head-pin" src={PinImg} alt="pin" />
            <div className="list-head-shadow bg-accompany"></div>

            <div className='container-body'>
                <div className='create-main bg-accompany'>
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
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
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
                                                    <FaMapMarkerAlt className="option-title-icon" color="red" />필드
                                                </div>
                                            )
                                        case 2:
                                            return (
                                                <div className='option-title'>
                                                    <BiTimeFive className='option-title-icon' />티업
                                                </div>
                                            )
                                        case 3:
                                            return (
                                                <div className='option-title'>
                                                    <BsPeopleFill className='option-title-icon' />인원수
                                                </div>
                                            )
                                        case 4:
                                            return (
                                                <div className='option-title'>
                                                    <IoGolf className='option-title-icon' />티 박스
                                                </div>
                                            )
                                        default: // 5
                                            return (
                                                <div></div>
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
                                                    <div className='option-golf-box cursor-able' onClick={toggleModal}>
                                                        {accompanyPlace === 0 ?
                                                            (
                                                                <div className='giant-plus'>+</div>
                                                            ) : (
                                                                <div className='option-golf-content'>
                                                                    <div className='option-golf-title'>
                                                                        <MdSportsGolf className="option-title-icon" />
                                                                        {getNameById(accompanyPlace)}
                                                                    </div>
                                                                    <div className='option-golf-place'>
                                                                        <FaMapMarkerAlt className='option-content-icon' color="red" />
                                                                        {getAddressById(accompanyPlace)}
                                                                    </div>
                                                                    <div className='option-golf-call'>
                                                                        <IoCall className='option-content-icon' />
                                                                        {getCallById(accompanyPlace)}
                                                                    </div>
                                                                    <button className='button golf' onClick={() => searchOnNaver()}>자세히 보기</button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            case 2:
                                                return (
                                                    <div>2번임</div>
                                                )
                                            case 3:
                                                return (
                                                    <div>3번임</div>
                                                )
                                            case 4:
                                                return (
                                                    <div>4번임</div>
                                                )
                                            case 5:
                                                return (
                                                    <div>5번임</div>
                                                )
                                            default:
                                                return (
                                                    <div>디폴트</div>
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
                        <Link to="/accompany">
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

            {/* <div className='createA-mainbox'>
                    
                    <div className='createA-accompanydate'>
                        <h2>동행일</h2>
                        <Datetime
                            value={moment(accompanyDate)}
                            onChange={(date) => setAccompanyDate(date)}
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
                    <div className='createA-enddate'>
                        <h2>동행일</h2>
                        <Datetime
                            value={moment(endDate)}
                            onChange={(date) => setEndDate(date)}
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
                            onClick={toggleModal}>
                            {accompanyPlace === 0 ? (
                                <div>골프장 선택하기</div>
                            ) : (
                                <div>{getNameById(accompanyPlace)} 선택 됨, 변경하기</div>
                            )}
                        </button>
                    </div>
                    <div className='createA-num'>
                        <h2>동행 인원</h2>
                        <input
                            type="number"
                            placeholder="본인포함 최대 4인"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                        />
                    </div>
                    <div className='createA-icon'>
                        <h2>선호 티박스</h2>
                        <div className='icon-list'>
                            <div
                                className={`icon ${selectedIcon === 'flagred' ? 'selected-icon' : ''}`}
                                onClick={() => setSelectedIcon('flagred')}
                            >
                                <img src={flagred} alt="flagred 1" />
                            </div>
                            <div
                                className={`icon ${selectedIcon === 'flagwhite' ? 'selected-icon' : ''}`}
                                onClick={() => setSelectedIcon('flagwhite')}
                            >
                                <img src={flagwhite} alt="flagwhite 2" />
                            </div>
                            <div
                                className={`icon ${selectedIcon === 'flagblack' ? 'selected-icon' : ''}`}
                                onClick={() => setSelectedIcon('flagblack')}
                            >
                                <img src={flagblack} alt="flagblack 3" />
                            </div>
                            <div
                                className={`icon ${selectedIcon === 'flagall' ? 'selected-icon' : ''}`}
                                onClick={() => setSelectedIcon('flagall')}
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
                </div> */}

            {/* 골프장 선택 Modal */}
            {isVisible &&
                <GolffieldModal
                    toggleModal={toggleModal}
                    setAccompanyPlace={setAccompanyPlace}
                />
            }

        </div>

    )
}


export default CreateAccompany;