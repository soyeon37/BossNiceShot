import React, { useEffect, useState } from "react";
import MyPageNavbar from "./MyPageNavbar";

import ListRoom from "./components/ListRoom";
import ChatRoom from "./components/ChatRoom";

import TeeRed from "../../assets/source/icons/flag-red.png";
import TeeWhite from "../../assets/source/icons/flag-white.png";
import TeeBlack from "../../assets/source/icons/flag-black.png";
import TeeAll from "../../assets/source/icons/flag-all.png";

import "./MyPage.css";
import axios from "axios";

function MyChat() {
    const [searchWord, setSearchWord] = useState("");
    const [roomId, setRoomId] = useState(0);

    const teeMap = {
        red: TeeRed,
        white: TeeWhite,
        black: TeeBlack,
        all: TeeAll,
    }

    // 사용자의 채팅방 목록
    const [chatRooms, setChatRooms] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + '/api/companion/participating')
            .then(response => {
                console.log(response);
                setChatRooms(response.data);
            });
    }, []);

    // 검색창 내 문자 변화 감지
    const handleSearchWord = (e) => {
        setSearchWord(e.target.value);
        console.log("검색어: ", searchWord);
    };

    // 리스트에서 선택된 방의 채팅방 보이기
    const handleRoomClick = (roomId) => {
        setRoomId(roomId);
        console.log("data: ", chatRooms);
    };

    const selectedoomData = chatRooms.find((chatRooms) => chatRooms.id === roomId);

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyChat" className="mypage-area">
                    <div id="chat-bar">
                        <div id="chat-search">
                            <input
                                type="text"
                                id="chat-room-search"
                                defaultValue={searchWord}
                                onChange={handleSearchWord}
                                placeholder="검색어를 입력하세요"
                            />
                        </div>
                        <div id="chat-list">
                            {chatRooms.map((chatRoomData) => (
                                <div key={chatRoomData.id} onClick={() => handleRoomClick(chatRoomData.id)}>
                                    <ListRoom
                                        title={chatRoomData.title}
                                        teeBox={teeMap[chatRoomData.teeBox]}
                                        field={chatRoomData.field}
                                        teeUpTime={chatRoomData.teeUpTime}
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
                                <ChatRoom props={selectedoomData} />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div >
    );
}

export default MyChat;
