package com.ssafy.domain.chat.dto.request;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.chat.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record ChatRoomRequest (@NotNull String title,
                               @NotNull String description,
                               @NotNull Integer field,
                               @NotNull TeeBox teeBox,
                               @NotNull Integer capacity,
                               @NotNull String teeUptime,
                               @NotNull String applicationDeadline){
    public ChatRoom toChatRoom(Member member) {
        return new ChatRoom(
                title,
                description,
                field,
                teeBox,
                capacity,
                LocalDateTime.parse(teeUptime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                LocalDateTime.parse(applicationDeadline, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                member
        );
    }
}
