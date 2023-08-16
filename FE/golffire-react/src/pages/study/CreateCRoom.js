import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // react-datepicker 라이브러리를 import합니다.
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker의 CSS 파일을 import합니다. 

import {
    Text,
    Button,
} from '@chakra-ui/react'

import "./study.css";
import axios from 'axios';

function CreateCRoom() {
    const studyType = 'COACHING';
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
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

        return  `${year}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day} ${hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}:00`;
    }

    return (
        <div className='editor-container'>
            <Text fontSize='3xl'>코칭룸 만들기</Text>
            <div className='editor-mainbox'>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    className='editor-title'
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="소개"
                    className='editor-content'
                />
                <div className='editor-num'>
                    <Text fontSize='xxl'>인원 수</Text>   
                    <input
                    type="number"
                    placeholder="2~20명 까지 가능"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    /> 
                </div>
                <div className='editor-buttons'>
                    <Link to="/studylist" style={{ textDecoration: "none" }}> 
                        <Button width='8rem'colorScheme='red'>취소</Button>
                    </Link>
                    <Button width='8rem' colorScheme='green' onClick={handleRegisterClick}>등록하기</Button>
                </div>
            </div>
        </div>
    )
}


export default CreateCRoom;
