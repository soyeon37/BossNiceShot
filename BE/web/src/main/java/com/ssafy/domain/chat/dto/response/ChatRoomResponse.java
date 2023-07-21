package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;

public record ChatRoomResponse(@NotNull Long id,
                               @NotNull String roomName) {
    public static ChatRoomResponse from(ChatRoom chatRoom) {
        return new ChatRoomResponse(
                chatRoom.getId(),
                chatRoom.getRoomName()
        );
    }
}
