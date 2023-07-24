package com.ssafy.domain.chat.dto.request;

import com.ssafy.domain.chat.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;

public record ChatRoomRequest (@NotNull String roomName){
    public ChatRoom toChatRoom() {
        return new ChatRoom(roomName);
    }
}
