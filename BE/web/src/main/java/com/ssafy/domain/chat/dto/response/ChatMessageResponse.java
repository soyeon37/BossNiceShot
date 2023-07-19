package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatMessage;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.format.DateTimeFormatter;

@Builder
public record ChatMessageResponse (@NotNull String message,
                                   @NotNull String sender,
                                   @NotNull String createdTime){
    public static ChatMessageResponse from(ChatMessage chatMessage) {
        return ChatMessageResponse.builder()
                .message(chatMessage.getMessage())
                .sender(chatMessage.getSender())
                .createdTime(chatMessage.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss")))
                .build();
    }
}
