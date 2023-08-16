import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components'

import NotificationComponent from "./NotificationComponent";
import BotImg from "../../../assets/source/imgs/favicon.png";
function SimpleChatBox() {
    // Chat Content
    const steps = [
        {
            id: '0',
            component: (
                <div> 안녕하세요!<br /><span className="span-bold">[사장님, 나이스 샷!]</span>입니다.<br />무엇을 도와드릴까요? </div>
            ),
            asMessage: true,
            trigger: '1',
        }, {
            id: '1',
            options: [
                { value: 1, label: '서비스 알아보기', trigger: '2' },
                { value: 2, label: '대화 종료', trigger: '3' },
            ],
        }, {
            id: '2',
            options: [
                { value: 1, label: '골프 자세 솔루션', trigger: '4' },
                { value: 2, label: '스터디', trigger: '7' },
                { value: 3, label: '골프장', trigger: '10' },
                { value: 4, label: '동행', trigger: '13' },
            ],
        }, {
            id: '3',
            component: (
                <div>이용해주셔서 감사합니다.<br />
                궁금한 부분이 있으시면 언제든 불러주세요!</div>
            ),
            asMessage: true,
            end: true,
        }, {
            id: '4',
            component: (
                <div><span className="span-bold">[골프 자세 솔루션]</span>은 스윙 자세를 교정하고 싶은 분들을 위한 솔루션 기능입니다.</div>
            ),
            asMessage: true,
            trigger: '5',
        },
        {
            id: '5',
            component: (
                <div>정확한 스윙 자세를 배우고 싶다면, 지금 바로 <span className="span-bold">[골프 자세 솔루션]</span>을 경험해보세요!</div>
            ),
            asMessage: true,
            trigger: '6',
        },
        {
            id: '6',
            component: (
                <div id="href-link"><a href="/solution"><span className="span-link">[자세 교정하러 가기]</span></a> </div>
            ),
            asMessage: true,
            trigger: '1'
        },
        {
            id: '7',
            component: (
                <div><span className="span-bold">[스터디]</span>는 실시간으로 전문 골프 프로에게 코칭을 받거나, 동료 골퍼들과 함께 러닝을 하는 기능입니다.</div>
            ),
            asMessage: true,
            trigger: '8',
        },

        {
            id: '8',
            component: (
                <div>프로, 동료들과의 코칭/러닝을 통해 더 나은 스윙을 하고 싶다면, 지금 바로 <span className="span-bold">[스터디]</span>를 경험해보세요!</div>
            ),
            asMessage: true,
            trigger: '9',
        },
        {
            id: '9',
            component: (
                <div id="href-link"><a href="/studylist"><span className="span-link">[스터디하러 가기]</span></a> </div>
            ),
            asMessage: true,
            trigger: '1'
        },
        {
            id: '10',
            component: (
                <div><span className="span-bold">[골프장]</span>은 전국 골프장의 현황과 위치를 검색할 수 있는 기능입니다.</div>
            ),
            asMessage: true,
            trigger: '11',
        },

        {
            id: '11',
            component: (
                <div>내 인근 골프장을 찾고 싶다면, 지금 바로 <span className="span-bold">[골프장]</span>을 통해 검색해보세요!</div>
            ),
            asMessage: true,
            trigger: '12',
        },
        {
            id: '12',
            component: (
                <div id="href-link"><a href="/golffield"><span className="span-link">[골프장 검색 하러 가기]</span></a> </div>
            ),
            asMessage: true,
            trigger: '1'
        },
        {
            id: '13',
            component: (
                <div><span className="span-bold">[동행]</span>은 같이 티업을 나갈 동행을 모집할 수 있는 기능입니다.</div>
            ),
            asMessage: true,
            trigger: '14',
        },

        {
            id: '14',
            component: (
                <div>내가 원하는 실력의 골퍼들과 필드를 나가고 싶다면, 지금 바로 <span className="span-bold">[동행]</span>을 경험해보세요!</div>
            ),
            asMessage: true,
            trigger: '15',
        },
        {
            id: '15',
            component: (
                <div id="href-link"><a href="/accompany"><span className="span-link">[동행 모집 하러 가기]</span></a> </div>
            ),
            asMessage: true,
            trigger: '1'
        },
    ];

    // Style
    const theme = {
        background: '#80CAFF',
        headerBgColor: '#4AB4FF',
        fontFamily: 'NanumBarunGothic',
        headerFontSize: '20px',
        botBubbleColor: '#FFDD67',
        headerFontColor: 'white',
        botFontColor: 'black',
        userBubbleColor: 'white',
        userFontColor: 'black',

    };

    // Set some properties of the bot
    const config = {
        floating: true,
    };

    return (
        <div className="Chatbot">
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="사장님, 나이스 샷!"
                    botAvatar={BotImg} // 이미지 설정
                    steps={steps}
                    {...config}
                />
            </ThemeProvider>

            {/* <NotificationComponent /> */}
        </div>
    )
}

export default SimpleChatBox;