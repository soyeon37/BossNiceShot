package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatParticipant;
import jakarta.validation.constraints.NotNull;

public record ChatParticipantResponse(@NotNull Long roomId,
                                      @NotNull String memberId) {
    public static ChatParticipantResponse from(ChatParticipant chatParticipant) {
        return new ChatParticipantResponse(
                chatParticipant.getChatRoom().getId(),
                chatParticipant.getMember().getId()
        );
    }
}
