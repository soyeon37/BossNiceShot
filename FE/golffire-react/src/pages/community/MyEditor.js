import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./editor.css";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'


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
            <div>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    className='editor-input'
                />
            </div>
            <div>
                <Button>취소</Button>
                <Button>등록하기</Button>

            </div>
        </div>
    )
}


export default MyEditor;