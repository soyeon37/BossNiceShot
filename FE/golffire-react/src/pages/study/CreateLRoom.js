import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    Text,
    Button,
} from '@chakra-ui/react'

import "./study.css";

function MyEditor() {
    
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    // "등록하기" 버튼 클릭 이벤트를 처리하는 함수
    const handleRegisterClick = () => {
        if (title.trim() === '') {
            alert("제목을 입력해주세요.");
        } else if (value.trim() === '') {
            alert("내용을 입력해주세요.");
        } else {
            const type = "LEARNING"
            // 등록 또는 제출 로직을 여기에 작성합니다.
            // 예를 들어, 서버로 데이터를 전송하거나 원하는 다른 작업을 수행할 수 있습니다.
            console.log("Type:", type);
            console.log("Title:", title);
            console.log("Content:", value);
            navigate('/LearningRoom', {
                state: {
                    type: type,
                    title: title,
                }
            });
        }
    };

    return (
        <div className='editor-container'>
            <Text fontSize='3xl'>러닝룸 만들기</Text>
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


export default MyEditor;
