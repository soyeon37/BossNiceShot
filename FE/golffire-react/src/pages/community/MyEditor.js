import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./editor.css";
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
                <Button width='8rem' margin={5}>취소</Button>
                <Button width='8rem' margin={5}>등록하기</Button>
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>글 내용을 입력해주세요.</AlertTitle>
                </Alert>
            </div>
        </div>
    )
}


export default MyEditor;