package com.ssafy.domain.chat.dto.request;

import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;

public record ChatMessageRequest (@NotNull String sender,
                                  @NotNull String message,
                                  @NotNull Long roomId){
    public ChatMessage toChatMessage(ChatRoom chatRoom) {
        return new ChatMessage(sender, message, chatRoom);
    }
}
