import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./editor.css";
import { Link, useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'


// const modules = {
//     toolbar: [
//         [{headr: [1, 2, 3, 4, 5, 7, false]}],
//         [{font: [] }],
//         [{size: [] }],
//         ["bold", "italic"],
//     ],
// };

function MyEditor() {

    const [value, setValue] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    // "등록하기" 버튼 클릭 이벤트를 처리하는 함수
    const handleRegisterClick = () => {
        if (value.trim() === '') {
            // 내용이 비어있을 경우 Alert를 표시합니다.
            setShowAlert(true);
        } else {
            // 등록 또는 제출 로직을 여기에 작성합니다.
            // 예를 들어, 서버로 데이터를 전송하거나 원하는 다른 작업을 수행할 수 있습니다.
            console.log("Content submitted:", value);
            navigate('/freeboardlist');
        }
    };

    return (
        <div className='editor-container'>
            <Text fontSize='3xl'>작성하기</Text>
            <div style={{ position: "relative" }}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    className='editor-input'
                />
                <Link to="/freeboardlist" style={{ textDecoration: "none" }}> 
                    <Button width='8rem' margin={5}>취소</Button>
                </Link>
                <Button width='8rem' margin={5} onClick={handleRegisterClick}>등록하기</Button>
                {showAlert && (
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>글 내용을 입력해주세요.</AlertTitle>
                    </Alert>
                )}
            </div>
        </div>
    )
}


export default MyEditor;
