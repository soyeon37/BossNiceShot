package com.ssafy.domain.chat.dto.request;

import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.MessageType;
import jakarta.validation.constraints.NotNull;

public record ChatMessageRequest (@NotNull MessageType type,
                                  String content,
                                  @NotNull String memberId,
                                  @NotNull String memberNickname,
                                  @NotNull Long chatRoomId){
    public ChatMessage toChatMessage() {
        return new ChatMessage(type, content, memberId, memberNickname, chatRoomId);
    }
}
