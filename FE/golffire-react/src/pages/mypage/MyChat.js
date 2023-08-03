import React, { useState } from "react";
import MyPageNavbar from "./MyPageNavbar";

import ListRoom from "./components/ListRoom";
import ChatRoom from "./components/ChatRoom";

import TeeRed from "../../assets/source/icons/flag-red.png";
import TeeWhite from "../../assets/source/icons/flag-white.png";
import TeeBlack from "../../assets/source/icons/flag-black.png";
import TeeAll from "../../assets/source/icons/flag-all.png";

import "./MyPage.css";

function MyChat() {
    const [searchWord, setSearchWord] = useState("");
    const [roomId, setRoomId] = useState("0");

    const teeMap = {
        red: TeeRed,
        white: TeeWhite,
        black: TeeBlack,
        all: TeeAll,
    }

    // 채팅방(참여하고 있는 동행 그룹) 리스트 정보
    const chatRoomsData = [
        {
            id: 1,
            title: "Chat Room 1",
            tee: "red",
            field: "Field 1",
            date: "2023-08-02",
        },
        {
            id: 2,
            title: "Chat Room 2",
            tee: "white",
            field: "Field 2",
            date: "2023-08-03",
        },
        {
            id: 3,
            title: "Chat Room 3",
            tee: "black",
            field: "Field 3",
            date: "2023-08-04",
        },
        {
            id: 4,
            title: "Chat Room 4",
            tee: "all",
            field: "Field 4",
            date: "2023-08-05",
        },
    ];

    // 검색창 내 문자 변화 감지
    const handleSearchWord = (e) => {
        setSearchWord(e.target.value);
        console.log("검색어: ", searchWord);
    };

    // 리스트에서 선택된 방의 채팅방 보이기
    const handleRoomClick = (roomId) => {
        setRoomId(roomId);
        console.log("data: ", chatRoomsData);
    };

    const selectedoomData = chatRoomsData.find((chatRoomsData) => chatRoomsData.id === roomId);

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
                            {chatRoomsData.map((chatRoomData) => (
                                <div key={chatRoomData.id} onClick={() => handleRoomClick(chatRoomData.id)}>
                                    <ListRoom
                                        title={chatRoomData.title}
                                        tee={teeMap[chatRoomData.tee]}
                                        field={chatRoomData.field}
                                        date={chatRoomData.date}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id="chat-room">
                        {roomId === "0" ? (
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
