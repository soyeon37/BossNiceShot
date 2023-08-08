package com.ssafy.domain.chat.dto.response;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.chat.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record ChatRoomResponse(@NotNull Long id,
                               @NotNull String title,
                               @NotNull Integer field,
                               @NotNull TeeBox teeBox,
                               @NotNull String teeUptime){
    public static ChatRoomResponse from(ChatRoom chatRoom) {
        return new ChatRoomResponse(
                chatRoom.getId(),
                chatRoom.getTitle(),
                chatRoom.getField(),
                chatRoom.getTeeBox(),
                chatRoom.getTeeUpTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
    }
}
