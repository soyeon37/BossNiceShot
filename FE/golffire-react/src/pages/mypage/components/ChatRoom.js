import React, {  useEffect, useState } from "react";

import MyChatBox from "./MyChatBox";
import OtherChatBox from "./OtherChatBox";

import axios from "axios";


import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

function ChatRoom({ props }) {
    const { id, title, teeBox, field, teeUpTime } = props;
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [stompClient, setStompClient] = useState(null);

    // 사용자(지금 로그인 한 사람)의 ID
    const currentUserId = "kim@ssafy.com";
    const currentUserNickname = "킴";

    const accessToken = axios.defaults.headers.common["Authorization"];

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect( {Authorization: `${accessToken}`} , (frame) => {
            setStompClient(stompClient);

            axios.get(`http://localhost:8080/chat/message/${id}`)
              .then(response => {
                setChatMessages(response.data);
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [id]);

    useEffect(() => {
        if (stompClient) {
            const subscription = stompClient.subscribe(`/sub/chat/message/` + id, response => {
                const message = JSON.parse(response.body);
                setChatMessages((prevChatMessages) => [...prevChatMessages, message]);
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [stompClient]);

    const handleSendMessage = () => {
        if (!stompClient || !messageInput) {
            return;
        }

        const newMessage = {
            type: 'CHAT',
            content: messageInput,
            memberId: currentUserId,
            memberNickname: currentUserNickname,
            chatRoomId: id
        };

        stompClient.send('/pub/chat/message', {Authorization: `${accessToken}`}, JSON.stringify(newMessage));
        setMessageInput('');
    }

    return (
        <div className="ChatRoom">
            <div id="room-header">
                {/* 티박스 이미지 출력 문제 해결 필요 */}
                <div id="room-title">{title} 방 </div>
                <div id="room-tee">{teeBox}</div>
                <div id="room-field">{field}</div>
                <div id="room-date">{teeUpTime}</div>
            </div>
            <div id="room-text">
                {chatMessages.map((chatMessage, index) => (
                    chatMessage.memberId === currentUserId ? (
                        <MyChatBox key={index} props={chatMessage} />
                    ) : (
                        <OtherChatBox key={index} props={chatMessage} />
                    )
                ))}
            </div>
            <div id="room-footer">
                <input
                    id="message"
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                    placeholder="메시지를 입력하세요."
                />
                <button id="icon-div" onClick={handleSendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
