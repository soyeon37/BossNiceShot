import React, { useState } from "react";

import { IoSendSharp } from "react-icons/io5";

import MyChatBox from "./MyChatBox";
import OtherChatBox from "./OtherChatBox";

function ChatRoom({ props }) {
    const { id, title, tee, field, date } = props;
    const [message, setMessage] = useState("");

    // 채팅 내역 (id를 통해 받아오는 정보)
    const chatContents = [
        {
            pic: "1",
            userId: "1234",
            nickname: "함싸피",
            message: "야 뭐해?",
            time: "2023-08-02 13시 11분",
        },
        {
            pic: "2",
            userId: "1237",
            nickname: "사용자1237",
            message: "오늘 날씨가 좋네요.",
            time: "2023-08-02 13시 15분",
        },
        {
            pic: "3",
            userId: "9999",
            nickname: "봇봇봇",
            message: "안녕하세요!",
            time: "2023-08-02 13시 20분",
        },
        {
            pic: "1",
            userId: "1234",
            nickname: "함싸피",
            message: "뭐하고 놀까요?",
            time: "2023-08-02 13시 25분",
        },
        {
            pic: "2",
            userId: "1237",
            nickname: "사용자1237",
            message: "식사는 하셨나요?",
            time: "2023-08-02 13시 30분",
        },
        {
            pic: "3",
            userId: "9999",
            nickname: "봇봇봇",
            message: "네, 식사는 했습니다.",
            time: "2023-08-02 13시 35분",
        },
        {
            pic: "1",
            userId: "1234",
            nickname: "함싸피",
            message: "무엇을 도와드릴까요?",
            time: "2023-08-02 13시 40분",
        },
        {
            pic: "2",
            userId: "1237",
            nickname: "사용자1237",
            message: "오늘은 무슨 계획이 있나요?",
            time: "2023-08-02 13시 45분",
        },
        {
            pic: "3",
            userId: "9999",
            nickname: "봇봇봇",
            message: "저는 항상 여러분과 대화를 즐기고 있어요.",
            time: "2023-08-02 13시 50분",
        },
        {
            pic: "1",
            userId: "1234",
            nickname: "함싸피",
            message: "좋아요! 그럼 이제 무엇을 할까요?",
            time: "2023-08-02 13시 55분",
        },
    ];

    // 사용자(지금 로그인 한 사람)의 ID
    const currentUserId = "1234";

    // 메시지 입력 감지
    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    // 메시지 전송
    const sendMessage = () => {
        console.log("전송할 메시지: ", message);
    }

    return (
        <div className="ChatRoom">
            <div id="room-header">
                {/* 티박스 이미지 출력 문제 해결 필요 */}
                <div id="room-title">{title} 방 </div>
                <div id="room-tee">{tee}</div>
                <div id="room-field">{field}</div>
                <div id="room-date">{date}</div>
            </div>
            <div id="room-text">
                {chatContents.map((chatContent, index) => (
                    chatContent.userId === currentUserId ? (
                        <MyChatBox key={index} props={chatContent} />
                    ) : (
                        <OtherChatBox key={index} props={chatContent} />
                    )
                ))}
            </div>
            <div id="room-footer">
                <input
                    id="message"
                    defaultValue={message}
                    onChange={handleMessage}
                    placeholder="메시지를 입력하세요."
                />
                <button id="icon-div" onClick={sendMessage}>
                    <h1>
                        <IoSendSharp />
                    </h1>
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
