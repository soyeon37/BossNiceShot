package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.MessageType;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record ChatMessageResponse (@NotNull MessageType messageType,
                                   @NotNull String message,
                                   @NotNull String memberId,
                                   @NotNull Long chatRoomId,
                                   @NotNull String createdTime){
    public static ChatMessageResponse from(ChatMessage chatMessage) {
        return new ChatMessageResponse(
                chatMessage.getMessageType(),
                chatMessage.getMessage(),
                chatMessage.getMemberId(),
                chatMessage.getChatRoomId(),
                chatMessage.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"))
        );
    }
}