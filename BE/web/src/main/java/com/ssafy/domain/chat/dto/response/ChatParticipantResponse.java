package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatParticipant;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ChatParticipantResponse(@NotNull Long roomId,
                                      @NotNull String memberId) {
    public static ChatParticipantResponse from(ChatParticipant chatParticipant) {
        return ChatParticipantResponse.builder()
                .roomId(chatParticipant.getChatRoom().getId())
                .memberId(chatParticipant.getMember().getMemberId())
                .build();
    }
}
