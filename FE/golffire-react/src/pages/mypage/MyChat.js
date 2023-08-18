import React, { useEffect, useState } from "react";
import MyPageNavbar from "./MyPageNavbar";

// Redux
import { useSelector } from "react-redux";

import ListRoom from "./components/ListRoom";
import ChatRoom from "./components/ChatRoom";

import "./MyPage.css";
import axios from "axios";

function MyChat() {
    // 사용자 정보(userId)로 axios 수행
    const userId = useSelector((state) => state.userInfoFeature.userId);
    const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // 채팅을 보일 방의 번호
    const [roomId, setRoomId] = useState(0);
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_SERVER_URL + "/api/companion/participating";
        // console.log("사용자 id(", userId, ") 기반으로 동행 리스트 호출"); // Debug Code !!!

        axios.get(apiUrl).then((response) => {
            setChatRooms(response.data);
            console.log("참여한 채팅방: ", response.data); // Debug Code !!!
        }).catch((error) => {
            console.log("참여한 채팅방 호출 중 에러 발생: ", error);
        });

    }, [])

    // 리스트에서 선택된 방의 채팅방 보이기
    const handleRoomClick = (id) => {
        if (id !== roomId)
            setRoomId(id);
        else
            setRoomId(0);
    };

    const selectedRoomData = chatRooms.find((chatRooms) => chatRooms.id === roomId);

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyChat" className="mypage-area">
                    <div id="chat-bar">
                        <div id="chat-list">
                            {chatRooms.map((chatRoomData) => (
                                <div
                                    className="chat-box"
                                    key={chatRoomData.id}
                                    onClick={() => handleRoomClick(chatRoomData.id)} >
                                    <ListRoom
                                        title={chatRoomData.title}
                                        teeBox={chatRoomData.teeBox}
                                        field={chatRoomData.field}
                                        teeUpTime={chatRoomData.teeUptime}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="chat-room">
                        {roomId === 0 ? (
                            <>
                                <div id="room-title">채팅창을 선택하세요.</div>
                            </>
                        ) : (
                            <>
                                <ChatRoom props={selectedRoomData} />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div >
    );
}

export default MyChat;
