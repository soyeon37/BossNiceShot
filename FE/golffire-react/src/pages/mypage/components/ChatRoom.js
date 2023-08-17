import React, {  useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";

import MyChatBox from "./MyChatBox";
import OtherChatBox from "./OtherChatBox";

import flagred from "../../../assets/source/icons/flag-red.png";
import flagwhite from "../../../assets/source/icons/flag-white.png";
import flagblack from "../../../assets/source/icons/flag-black.png";
import flagall from "../../../assets/source/icons/flag-all.png";

import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

// Redux
import { useSelector } from "react-redux";

function ChatRoom({ props }) {
    const currentUserId = useSelector((state) => state.userInfoFeature.userId);
    const currentUserNickname = useSelector((state) => state.userInfoFeature.userNickname);
    const currentUserImage = useSelector((state) => state.userInfoFeature.userImage);

    const { id, title, teeBox, field, teeUpTime } = props;
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [stompClient, setStompClient] = useState(null);

    // AccessToken (Redux)
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    // Header (AccessToken)
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    // 이미지 파일 경로를 객체로 관리
    const teeMap = {
        RED: flagred,
        WHITE: flagwhite,
        BLACK: flagblack,
        NONE: flagall,
    };
    
    useEffect(() => {
        const socket = new SockJS(process.env.REACT_APP_SERVER_URL + '/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect( {headers} , (frame) => {
            setStompClient(stompClient);

            console.log("들어옴");

            axios.get(process.env.REACT_APP_SERVER_URL + `/api/companion/chat/${id}`)
              .then(response => {
                setChatMessages(response.data);

                console.log("?");
                console.log(response.data);
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
            const subscription = stompClient.subscribe(`/sub/chat/` + id, response => {
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
            memberImage: currentUserImage,
            companionId: id
        };

        stompClient.send('/pub/chat', {Authorization: `${accessToken}`}, JSON.stringify(newMessage));
        setMessageInput('');
    }

    const dateFormat = (input) => {
        if (input == null) {
            return;
        }

        const date = new Date(input);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return (hours < 13 ? `오전` : `오후`)  + ` ${hours % 12 == 0 ? 12 : hours % 12}:${String(minutes).padStart(2, "0")}`;
    };

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
                        <MyChatBox key={index} props={chatMessage} dateFormat={dateFormat}/>
                    ) : (
                        <OtherChatBox key={index} props={chatMessage} dateFormat={dateFormat}/>
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
                    <h1>
                        <IoSendSharp />
                    </h1>
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
