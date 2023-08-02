import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components'

import NotificationComponent from "./NotificationComponent";

function SimpleChatBox() {
    // Chat Content
    const steps = [
        {
            id: '0',
            message: '안녕하세요 무엇을 도와드릴까요?',
            trigger: '1',
        }, {
            id: '1',
            options: [
                { value: 1, label: '동행 구하기', trigger: '2' },
                { value: 2, label: '동행 취소하기', trigger: '3' },
                { value: 3, label: '대화 종료', trigger: '4' }
            ],
        }, {
            id: '2',
            message: "동행 구하는 방법에 대해 안내드리겠습니다.",
            trigger: '0',
        }, {
            id: '3',
            message: "동행을 취소하고 싶으신가요? 안내하겠습니다.",
            trigger: '0',
        }, {
            id: '4',
            message: '대화가 종료되었습니다.',
            end: true,
        }
    ];

    // Style
    const theme = {
        background: '#C9FF8F',
        headerBgColor: '#197B22',
        headerFontSize: '20px',
        botBubbleColor: '#0F3789',
        headerFontColor: 'white',
        botFontColor: 'white',
        userBubbleColor: '#FF5733',
        userFontColor: 'white',
    };

    // Set some properties of the bot
    const config = {
        floating: true,
    };

    return (
        <div className="Chatbot">
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="사장님 나이스 샷! 안내 봇"
                    steps={steps}
                    {...config}
                />
            </ThemeProvider>

            {/* <NotificationComponent /> */}
        </div>
    )
}

export default SimpleChatBox;