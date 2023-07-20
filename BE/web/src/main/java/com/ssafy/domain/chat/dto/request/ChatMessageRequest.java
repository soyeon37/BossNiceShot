package com.ssafy.domain.chat.dto.request;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.ChatRoom;
import com.ssafy.domain.chat.entity.MessageType;

public record ChatMessageRequest (MessageType messageType,
                                  String message,
                                  String memberId,
                                  Long roomId){
    public ChatMessage toChatMessage(Member member, ChatRoom chatRoom) {
        return new ChatMessage(messageType, message, member, chatRoom);
    }
}
