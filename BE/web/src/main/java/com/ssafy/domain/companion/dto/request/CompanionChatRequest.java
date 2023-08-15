package com.ssafy.domain.companion.dto.request;

import com.ssafy.domain.companion.entity.CompanionChat;
import com.ssafy.domain.companion.entity.MessageType;
import jakarta.validation.constraints.NotNull;

public record CompanionChatRequest(@NotNull MessageType type,
                                   String content,
                                   @NotNull String memberId,
                                   @NotNull String memberNickname,
                                   @NotNull String memberImage,
                                   @NotNull Long companionId){
    public CompanionChat toCompanionChat() {
        return new CompanionChat(type, content, memberId, memberNickname, memberImage, companionId);
    }
}
