import React, { useState } from "react";
import MyPageNavbar from "./MyPageNavbar";
import ChatRoom from "./components/ChatRoom";
import "./MyPage.css";

function MyChat() {
    const [searchWord, setSearchWord] = useState("");

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
            tee: "unknown",
            field: "Field 4",
            date: "2023-08-05",
        },
    ];

    // 검색창 내 문자 변화 감지
    const handleSearchWord = (e) => {
        setSearchWord(e.target.value);
        console.log("검색어: ", searchWord);
    };

    return (
        <div id="MyPage">
            <div id="MyPageBox">
                <MyPageNavbar />
                <div id="MyChat">
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
                                <ChatRoom
                                    key={chatRoomData.id}
                                    title={chatRoomData.title}
                                    tee={chatRoomData.tee}
                                    field={chatRoomData.field}
                                    date={chatRoomData.date}
                                />
                            ))}
                            </div>
                    </div>
                    <div id="chat-room">
                        <div id="room-title"></div>
                        <div id="room-text"></div>
                        <div id="room-input"></div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyChat;
