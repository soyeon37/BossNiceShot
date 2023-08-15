import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // react-datepicker 라이브러리를 import합니다.
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker의 CSS 파일을 import합니다. 

import {
    Text,
    Button,
} from '@chakra-ui/react'

import "./study.css";

function EditRoom() {
    
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [password, setPassword] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    
    // "등록하기" 버튼 클릭 이벤트를 처리하는 함수
    const handleRegisterClick = () => {
        if (title.trim() === '') {
            alert("제목을 입력해주세요.");
        } else if (value.trim() === '') {
            alert("내용을 입력해주세요.");
        } else if (password.trim() === '') {
            alert("비밀번호를 입력해주세요.");
        } else if (password.trim().length !== 4 || !/^\d+$/.test(password.trim())) {
            alert("비밀번호는 4자리 숫자로 입력해주세요.");
        } else if (maxParticipants.trim() === '') {
            alert("최대인원수를 입력해주세요.");
        } else {
            const maxParticipantsNum = parseInt(maxParticipants.trim(), 10);
            if (isNaN(maxParticipantsNum) || maxParticipantsNum < 2 || maxParticipantsNum > 20) {
                alert("최대인원수는 2에서 20 사이의 숫자로 입력해주세요.");
            } else if (selectedDate === null) {
                alert("날짜를 선택해주세요.");
            } else {
                const type = "COACHING"
                // 등록 또는 제출 로직을 여기에 작성합니다.
                // 예를 들어, 서버로 데이터를 전송하거나 원하는 다른 작업을 수행할 수 있습니다.
                console.log("Type:", type);
                console.log("Title:", title);
                console.log("Content:", value);
                console.log("Password:", password);
                console.log("Max Participants:", maxParticipants);
                console.log("Selected Date:", selectedDate);
                navigate('/studylist');
            }
        }
    };

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
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="내용"
                    className='editor-content'
                />
                <div className='editor-password'>
                    <Text fontSize='xxl'>비밀번호</Text>
                    <input
                        type="password"
                        placeholder="4자리 비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="[0-9]{4}"
                        title="4자리의 숫자를 입력해주세요."
                    />
                </div>
                <div className='editor-num'>
                    <Text fontSize='xxl'>최대인원</Text>   
                    <input
                    type="number"
                    placeholder="2~20명 까지 가능"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    /> 
                </div>
                <div className='editor-date'>
                    <Text fontSize='xxl'>진행일시</Text>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="yyyy년 MM월 dd일"
                        placeholderText="날짜를 선택하세요"
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


export default EditRoom;
