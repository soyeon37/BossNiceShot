package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.MessageType;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record ChatMessageResponse (@NotNull MessageType messageType,
                                   @NotNull String message,
                                   @NotNull String memberId,
                                   @NotNull Long roomId,
                                   @NotNull String createdTime){
    public static ChatMessageResponse from(ChatMessage chatMessage) {
        return new ChatMessageResponse(
                chatMessage.getType(),
                chatMessage.getMessage(),
                chatMessage.getMember().getId(),
                chatMessage.getChatRoom().getId(),
                chatMessage.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"))
        );
    }
}