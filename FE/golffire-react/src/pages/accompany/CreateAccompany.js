import React, { useState, useEffect } from 'react';
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

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
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
        console.log(limit, " 제한인 상태에서 다음으로 넘어가려 함.");
        if (pageNum <= limit) {
            setPage(pageNum);
        } else {
            alert("값을 입력해 주세요!");
        }
    }

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [accompanyDate, setAccompanyDate] = useState(new Date());
    const [accompanyPlace, setAccompanyPlace] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [maxParticipants, setMaxParticipants] = useState(2);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const navigate = useNavigate();

    // 골프장 모달을 열고 닫는 함수
    const toggleModal = () => {
        setIsVisible(!isVisible);
    }

    // 네이버 검색창 연결 함수
    const searchOnNaver = () => {
        const naverSearchUrl = `https://search.naver.com/search.naver?query=` + getNameById(accompanyPlace);
        window.open(naverSearchUrl, '_blank');
    }

    // 골프장이 선택될 때마다 실행되는 함수
    useEffect(() => {
        if (limit === 1 && accompanyPlace !== 0) setLimit(4);
    }, [accompanyPlace]);


    // 티업 날짜 및 시간 입력 함수
    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const updatedDate = new Date(accompanyDate);
        updatedDate.setFullYear(selectedDate.getFullYear());
        updatedDate.setMonth(selectedDate.getMonth());
        updatedDate.setDate(selectedDate.getDate());
        setAccompanyDate(updatedDate);
    };
    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        const [hours, minutes] = selectedTime.split(':');
        const updatedTime = new Date(accompanyDate);
        updatedTime.setHours(hours);
        updatedTime.setMinutes(minutes);
        updatedTime.setSeconds(0);
        setAccompanyDate(updatedTime);
    };

    // 이미지 파일 경로를 객체로 관리
    const iconPaths = {
        flagred: flagred,
        flagwhite: flagwhite,
        flagblack: flagblack,
        flagall: flagall,
    };

    // 티 박스가 선택될 때마다 실행되는 함수
    useEffect(() => {
        if (limit === 4 && selectedIcon !== null) setLimit(5);
    }, [selectedIcon]);

    // Date() 객체를 원하는 format으로 출력
    const optionDateTime = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };

    // "등록하기" 버튼 클릭 이벤트를 처리하는 함수
    const handleRegisterClick = () => {
        if (title.trim() === '') {
            alert("제목을 입력해주세요.");
        } else if (value.trim() === '') {
            alert("내용을 입력해주세요.");
        } else {
            // 등록 또는 제출 로직을 여기에 작성합니다.
            // 예를 들어, 서버로 데이터를 전송하거나 원하는 다른 작업을 수행할 수 있습니다.

            console.log("Title:", title);
            console.log("Content:", value);
            console.log("Accompony Date:", accompanyDate);
            console.log("Max Participants:", maxParticipants);
            console.log("Selected Icon:", selectedIcon);
            navigate('/accompany');
        }
    };

    // 처음 화면이 로딩될 때 한 번 실행되는 함수
    useEffect(() => {
        const currentTime = new Date(accompanyDate);
        currentTime.setSeconds(0);
        setAccompanyDate(currentTime);
    }, []);

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
                                                    <div className='option-datetime'>
                                                        <input type="date"
                                                            className='option-datetime-box'
                                                            value={accompanyDate.toISOString().split('T')[0]}
                                                            onChange={handleDateChange} />
                                                        <input type="time"
                                                            className='option-datetime-box'
                                                            value={accompanyDate.toTimeString().split(' ')[0]}
                                                            onChange={handleTimeChange} />
                                                    </div>
                                                )
                                            case 3:
                                                return (
                                                    <div className='option-people'>
                                                        <button className='option-people-icon'
                                                            disabled={maxParticipants >= 4}
                                                            onClick={() => setMaxParticipants(maxParticipants + 1)} >
                                                            <AiOutlinePlus className='option-title-icon icon-background' />
                                                        </button>
                                                        <div className="option-people-div" >
                                                            {maxParticipants}
                                                        </div>
                                                        <button className="option-people-icon"
                                                            disabled={maxParticipants <= 2}
                                                            onClick={() => setMaxParticipants(maxParticipants - 1)}>
                                                            <AiOutlineMinus className='option-title-icon icon-background' />
                                                        </button>
                                                    </div>
                                                )
                                            case 4:
                                                return (
                                                    <div className='option-tee'>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagred} alt='레드 티 박스'
                                                                onClick={() => setSelectedIcon('flagred')}
                                                                className={`option-tee-img${selectedIcon === 'flagred' ? '-selected' : ''}`} />
                                                        </div>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagwhite} alt='화이트 티 박스'
                                                                onClick={() => setSelectedIcon('flagwhite')}
                                                                className={`option-tee-img${selectedIcon === 'flagwhite' ? '-selected' : ''}`} />
                                                        </div>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagblack} alt='블랙 티 박스'
                                                                onClick={() => setSelectedIcon('flagblack')}
                                                                className={`option-tee-img${selectedIcon === 'flagblack' ? '-selected' : ''}`} />
                                                        </div>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagall} alt='모든 티 박스'
                                                                onClick={() => setSelectedIcon('flagall')}
                                                                className={`option-tee-img${selectedIcon === 'flagall' ? '-selected' : ''}`} />
                                                        </div>
                                                    </div>
                                                )
                                            default: // 5
                                                return (
                                                    <div className='option-total'>
                                                        <div className='option-total-bold'>
                                                            {getNameById(accompanyPlace)}
                                                        </div>
                                                        <div className='option-total-normal'>
                                                            {new Intl.DateTimeFormat('ko-KR', optionDateTime).format(accompanyDate)}
                                                        </div>
                                                        <div className='option-total-bold'>
                                                            {maxParticipants}명
                                                        </div>
                                                        <div className='option-total-normal'>
                                                            <img className='tee-icon' src={iconPaths[selectedIcon]} alt={selectedIcon} />
                                                        </div>
                                                        <div className='option-total-img'>
                                                            <img className='mascot-deco' src={flagall} alt="mascot-bear" />
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
            </div >

            {/* 골프장 선택 Modal */}
            {
                isVisible &&
                <GolffieldModal
                    toggleModal={toggleModal}
                    setAccompanyPlace={setAccompanyPlace}
                />
            }

        </div >

    )
}


export default CreateAccompany;