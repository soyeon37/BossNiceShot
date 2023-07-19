package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ChatRoomResponse(@NotNull Long id,
                               @NotNull String roomName) {
    public static ChatRoomResponse from(ChatRoom chatRoom) {
        return ChatRoomResponse.builder()
                .id(chatRoom.getId())
                .roomName(chatRoom.getRoomName())
                .build();
    }
}
