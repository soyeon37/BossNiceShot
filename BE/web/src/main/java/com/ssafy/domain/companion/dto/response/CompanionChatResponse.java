package com.ssafy.domain.companion.dto.response;

import com.ssafy.domain.companion.entity.CompanionChat;
import com.ssafy.domain.companion.entity.MessageType;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record CompanionChatResponse(@NotNull MessageType type,
                                    @NotNull String content,
                                    @NotNull String memberId,
                                    @NotNull String memberNickname,
                                    @NotNull String memberImage,
                                    @NotNull Long companionId,
                                    @NotNull String createdTime){

    public static CompanionChatResponse from(CompanionChat companionChat) {
        return new CompanionChatResponse(
                companionChat.getType(),
                companionChat.getContent(),
                companionChat.getMemberId(),
                companionChat.getMemberNickname(),
                companionChat.getMemberImage(),
                companionChat.getCompanionId(),
                companionChat.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"))
        );
    }
}