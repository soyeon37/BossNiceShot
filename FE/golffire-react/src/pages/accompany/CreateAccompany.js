import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ko } from "date-fns/esm/locale";

// Redux
import { useSelector } from "react-redux";

import GolffieldModal from './GolffieldModal';
import { getNameById, getAddressById, getCallById } from "../golffield/ParseGolfId";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './GolffieldModal.css';

import flagred from '../../assets/source/icons/flag-red.png';
import flagwhite from '../../assets/source/icons/flag-white.png';
import flagblack from '../../assets/source/icons/flag-black.png';
import flagall from '../../assets/source/icons/flag-all.png';
import bearImg from '../../assets/source/mascot/bear-fullswing.png';

import PinImg from "../../assets/source/icons/pin.png";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { BsArrowLeftCircle, BsArrowRightCircle, BsPeopleFill } from "react-icons/bs";
import { IoGolf, IoCall } from "react-icons/io5";
import { MdSportsGolf } from "react-icons/md";

import axios from 'axios';


function CreateAccompany() {
    const navigate = useNavigate();

    const [checkInDate, setCheckInDate] = useState(new Date());
    const [time, setTime] = useState('12:34pm')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [teeUpTime, setTeeUpTime] = useState(null);
    const [field, setField] = useState(0);
    const [capacity, setCapacity] = useState(2);
    const [teeBox, setTeeBox] = useState(null);

    const [isGoldFieldVisible, setIsGoldFieldVisible] = useState(false);

    // 사용자 정보(userId)로 axios 수행
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

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

            window.location.replace('/accompany');
        })
    }

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

    // 네이버 검색창 연결 함수
    const searchOnNaver = () => {
        const naverSearchUrl = `https://search.naver.com/search.naver?query=` + getNameById(field);
        window.open(naverSearchUrl, '_blank');
    }

    // 골프장이 선택될 때마다 실행되는 함수
    useEffect(() => {
        if (limit === 1 && field !== 0) setLimit(4);
    }, [field]);


    // 티업 날짜 및 시간 입력 함수
    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const updatedDate = new Date(teeUpTime);

        updatedDate.setFullYear(selectedDate.getFullYear());
        updatedDate.setMonth(selectedDate.getMonth());
        updatedDate.setDate(selectedDate.getDate());

        setTeeUpTime(updatedDate);
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        const [hours, minutes] = selectedTime.split(':');
        const updatedTime = new Date(teeUpTime);

        updatedTime.setHours(hours);
        updatedTime.setMinutes(minutes);
        updatedTime.setSeconds(0);

        setTeeUpTime(updatedTime);
    };

    // 이미지 파일 경로를 객체로 관리
    const iconPaths = {
        RED: flagred,
        WHITE: flagwhite,
        BLACK: flagblack,
        NONE: flagall,
    };

    // 티 박스가 선택될 때마다 실행되는 함수
    useEffect(() => {
        if (limit === 4 && teeBox !== null) setLimit(5);
    }, [teeBox]);

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
        if (title.trim() == "") {
            alert("제목 입력");
        } else if (description.trim() == "") {
            alert("소개 입력");
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
        }
    };

    // 처음 화면이 로딩될 때 한 번 실행되는 함수
    useEffect(() => {
        const currentTime = new Date(teeUpTime);
        currentTime.setSeconds(0);
        setTeeUpTime(currentTime);
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
                <img className="list-head-pin" src={PinImg} alt="pin" />
                <div className="list-head-shadow bg-accompany"></div>
            </div>

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
                                                <div className='option-title'>
                                                    <IoGolf className='option-title-icon' />티업 정보
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
                                                    <div className='option-golf-box cursor-able' onClick={handleGoldFieldModal}>
                                                        {field === 0 ?
                                                            (
                                                                <div className='giant-plus'>+</div>
                                                            ) : (
                                                                <div className='option-golf-content'>
                                                                    <div className='option-golf-title'>
                                                                        <MdSportsGolf className="option-title-icon" />
                                                                        {getNameById(field)}
                                                                    </div>
                                                                    <div className='option-golf-place'>
                                                                        <FaMapMarkerAlt className='option-content-icon' color="red" />
                                                                        {getAddressById(field)}
                                                                    </div>
                                                                    <div className='option-golf-call'>
                                                                        <IoCall className='option-content-icon' />
                                                                        {getCallById(field)}
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
                                                        {/* <input type="date"
                                                            className='option-datetime-box'
                                                            value={teeUpTime.toISOString().split('T')[0]}
                                                            onChange={handleDateChange} /> */}
                                                       
                                                        <DatePicker locale={ko}
                                                            dateFormat="yyyy-MM-dd"
                                                            className="input-datepicker"
                                                            minDate={new Date()}
                                                            closeOnScroll={true}
                                                            placeholderText="체크인 날짜 선택"
                                                            selected={checkInDate}
                                                            onChange={(date) => setCheckInDate(date)} />
                                                             <input type="time"
                                                            className='option-datetime-box'
                                                            value={teeUpTime.toTimeString().split(' ')[0]}
                                                            onChange={handleTimeChange} />
                                                    </div>
                                                )
                                            case 3:
                                                return (
                                                    <div className='option-people'>
                                                        <button className='option-people-icon'
                                                            disabled={capacity >= 4}
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
                                            case 4:
                                                return (
                                                    <div className='option-tee'>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagred} alt='레드 티 박스'
                                                                onClick={() => setTeeBox('RED')}
                                                                className={`option-tee-img${teeBox === 'RED' ? '-selected' : ''}`} />
                                                        </div>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagwhite} alt='화이트 티 박스'
                                                                onClick={() => setTeeBox('WHITE')}
                                                                className={`option-tee-img${teeBox === 'WHITE' ? '-selected' : ''}`} />
                                                        </div>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagblack} alt='블랙 티 박스'
                                                                onClick={() => setTeeBox('BLACK')}
                                                                className={`option-tee-img${teeBox === 'BLACK' ? '-selected' : ''}`} />
                                                        </div>
                                                        <div className='tee-grid-item'>
                                                            <img src={flagall} alt='모든 티 박스'
                                                                onClick={() => setTeeBox('NONE')}
                                                                className={`option-tee-img${teeBox === 'NONE' ? '-selected' : ''}`} />
                                                        </div>
                                                    </div>
                                                )
                                            default: // 5
                                                return (
                                                    <div className='option-total'>
                                                        <div className='option-total-bold'>
                                                            {getNameById(field)}
                                                        </div>
                                                        <div className='option-total-normal'>
                                                            {new Intl.DateTimeFormat('ko-KR', optionDateTime).format(field)}
                                                        </div>
                                                        <div className='option-total-normal'>
                                                            {capacity}명
                                                        </div>
                                                        <div className='option-total-tee'>
                                                            <img className='tee-icon' src={iconPaths[teeBox]} alt={teeBox} />
                                                        </div>
                                                        <div className='option-total-img'>
                                                            <img className='mascot-deco' src={bearImg} alt="mascot-bear" />
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
                            <button className='cancel'>취소하기</button>
                        </Link>
                        <button
                            className='confirm'
                            onClick={handleRegisterClick}
                        >등록하기</button>
                    </div>
                </div>
                <div className='create-body-shadow bg-shadow'></div>
            </div >

            {/* 골프장 선택 Modal */}
            {isGoldFieldVisible &&
                <GolffieldModal
                    toggleModal={handleGoldFieldModal}
                    setAccompanyPlace={setField}
                />
            }
        </div >
    )
}

export default CreateAccompany;