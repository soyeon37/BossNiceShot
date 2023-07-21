package com.ssafy.domain.chat.dto.request;

import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.MessageType;

public record ChatMessageRequest (MessageType messageType,
                                  String message,
                                  String memberId,
                                  Long chatRoomId){
    public ChatMessage toChatMessage() {
        return new ChatMessage(messageType, message, memberId, chatRoomId);
    }
}
